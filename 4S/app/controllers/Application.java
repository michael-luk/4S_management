package controllers;

import LyLib.Interfaces.IConst;
import LyLib.Utils.StrUtil;
import com.avaje.ebean.Ebean;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import controllers.biz.AdminBiz;
import controllers.biz.ConfigBiz;
import models.Admin;
import play.data.Form;
import play.i18n.Lang;
import play.libs.F;
import play.libs.ws.WS;
import play.libs.ws.WSResponse;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Results;
import play.mvc.WebSocket;
import util.*;
import views.html.backend_login;
import views.html.phone_bind;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Properties;

import static play.data.Form.form;

public class Application extends Controller implements IConst {
    public static boolean taskFlag = true;
    public static String dbType = "";
    public static String dbUser = "";
    public static String dbPsw = "";
    public static String dbName = "";
    public static String dbPort = "";
    public static String mysqlBinDir = "";

    public static boolean weixinFunction = false;
    public static boolean smsCaptchaFunction = false;

    // 即时通讯频道(可组装成hashmap来区分不同的channel)
    public static HashMap<String, WebSocket.Out> nameChannels = new HashMap<>();

    // connect & echo
    public static WebSocket<String> webSocket() {
        return WebSocket.whenReady((in, out) -> {
            // 收到消息事件
            in.onMessage((msg) -> {
                if (msg.startsWith("init,") && msg.split(",").length >= 2) {
                    nameChannels.put(msg.split(",")[1], out);
                    play.Logger.info("channel init: " + msg);
                } else if (msg.startsWith("close,") && msg.split(",").length >= 2) {
                    closeChannel(msg.split(",")[1]);
                } else
                    play.Logger.info("chat: " + msg);
            });

            // 断开事件
            in.onClose(() -> {
                play.Logger.info("WebSocket某个连接断开.");
            });

            // 连接成功事件(可不设置)
            play.Logger.info("WebSocket收到成功连接.");
//            out.write("您已连接!");
        });
    }

    // server push
    public static Result chat(String msg) {
        if (msg.startsWith("close,") && msg.split(",").length >= 2) {
            closeChannel(msg.split(",")[1]);
        } else {
            for (WebSocket.Out channel : nameChannels.values()) {
                channel.write(msg);
            }
        }
        return ok("Msg sent: " + msg);
    }

    public static void closeChannel(String channelKey) {
        if (StrUtil.isNull(channelKey)) return;
        if (!nameChannels.containsKey(channelKey)) return;

        WebSocket.Out channel = nameChannels.get(channelKey);
        if (channel != null) {
            nameChannels.get(channelKey).close();
            nameChannels.remove(channelKey);
            play.Logger.info("channel close: " + channelKey);
        }
    }

    public static Result getChannels() {
        Integer count = 0;
        String result = "";
        for (String key : nameChannels.keySet()) {
            count++;
            result += key + "\n";
        }
        result += "频道总数: " + count;
        play.Logger.info(result);
        return ok(result);
    }

    public static void sendWebSocketByChannelTag(String keyPrefix, String msg) {
        if (ConfigBiz.getBoolConfig("websocket"))
            for (String key : nameChannels.keySet()) if (key.startsWith(keyPrefix)) nameChannels.get(key).write(msg);
    }

    public static Result checkAlive() {
        return ok("alive");
    }

    public static Result cfgSelfCheck() {
        if (ConfigBiz.selfCheck4All()) {
            return ok("all cfg pass self check.");
        } else {
            return ok("all cfg NOT pass self check.");
        }
    }

    public static Result clearSession() {
        session().clear();
        return ok("session cleared");
    }

    public static Result login() {
//        session().clear();
//        session("login_user_name", admin.name);
//        session(SESSION_USER_ID, admin.id.toString());
        return Results.TODO;
    }
//
//    public static Result logout() {
//        session().clear();
//        return redirect(routes.Application.login());
//    }


    public static Result phoneBindPage() {
        return ok(phone_bind.render());
    }

    public static Result backendPage() {
        return redirect("/admin/admin");
    }

    public static Result backendLogin() {
        Admin admin = AdminBiz.findByloginName(session(SESSION_USER_NAME));
        if (admin != null && admin.userRoleEnum > 0) {
            return redirect("/admin/admin");
        } else
            return ok(backend_login.render(form(AdminLoginParser.class)));
    }

    public static F.Promise<Result> backendAuthenticate() {
        Form<AdminLoginParser> loginForm = form(AdminLoginParser.class).bindFromRequest();
        if (loginForm.hasErrors()) {
            play.Logger.error("admin login form error: " + loginForm.errors().toString());
            flash("logininfo", loginForm.globalError().message());
            return F.Promise.promise(() -> redirect(routes.Application.backendLogin()));
        } else {
            session().clear();
            Admin admin = AdminBiz.findByloginName(loginForm.get().username);

            if (admin != null) {
                Integer role = admin.userRoleEnum;
                if (role > 0) {
                    // 1管理员, 2超级管理员
                    // 更新最后一次登录的IP
                    // 异步获取登录ip地
                    admin.lastLoginIp = request().remoteAddress();
                    play.Logger.info("admin login on ip: " + admin.lastLoginIp);
                    admin.lastLoginTime = new Date();
                    session("admin_login_timeout", LyLib.Utils.DateUtil.Date2Str(admin.lastLoginTime));
                    Ebean.update(admin);

                    session("name", admin.name);
                    session(SESSION_USER_ID, Long.toString(admin.id));
                    session(SESSION_USER_ROLE, role.toString());
                    play.Logger.info("admin login success: " + loginForm.get().username);

                    F.Promise<WSResponse> response
                            = WS.url("http://ip.taobao.com/service/getIpInfo.php?ip=" + admin.lastLoginIp).get();
                    return response.map(resp -> {
                        String respStr = resp.getBody();
                        play.Logger.info("response raw get admin login ip: " + respStr);

                        JsonNode respJson = resp.asJson();
                        if (respJson.get("code") != null && "0".equals(respJson.get("code").toString())) {
                            admin.lastLoginIpArea = respJson.get("data").get("country").asText()
                                    + respJson.get("data").get("region").asText()
                                    + respJson.get("data").get("city").asText()
                                    + respJson.get("data").get("isp").asText();
                        } else {
                            if ("0:0:0:0:0:0:0:1".equals(admin.lastLoginIp)) {
                                admin.lastLoginIpArea = "本机登录";
                            } else {
                                admin.lastLoginIpArea = "未知位置";
                            }
                        }
                        Ebean.update(admin);

                        // 登陆成功后的跳转(可以改成跳到其他界面)
                        return redirect("/admin/admin");
                    }).recover(throwable -> redirect("/admin/admin"));
                } else {
                    play.Logger.error("admin login failed on role: " + loginForm.get().username);
                    return F.Promise.promise(() -> forbidden("您没有权限登录后台"));
                }
            } else {
                play.Logger.error("admin login not found: " + loginForm.get().username);
                return F.Promise.promise(() -> redirect(routes.Application.backendLogin()));
            }
        }
    }

    public static class AdminLoginParser {

        public String username;
        public String password;
        public String captchaField;

        public String validate() {
            if (StrUtil.isNull(captchaField)) return "请输入验证码";
            if (!captchaField.equals(session().get("admin_login"))) return "验证码错误, 请重试";
            session().remove("admin_login");

            if (!AdminBiz.userExist(username)) return "不存在此用户";
            if (password != null && password.length() < 32) password = LyLib.Utils.MD5.getMD5(password);
            if (AdminBiz.authenticate(username, password) == null) return "用户名或密码错误";
            return null;
        }
    }

    @MethodName("管理员注销")
    public static Result backendLogout() {
        session().clear();
        flash("logininfo", "您已登出, 请重新登录");
        return redirect(routes.Application.backendLogin());
    }

    public static Result captcha(String tag) {
        DefaultKaptcha captcha = new DefaultKaptcha();
        Properties props = new Properties();
        Config config = new Config(props);
        captcha.setConfig(config);

        String text = captcha.createText();
        BufferedImage img = captcha.createImage(text);

        session(tag, text);

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            ImageIO.write(img, "jpg", stream);
            stream.flush();
        } catch (IOException e) {
            play.Logger.error(e.getMessage());
        }
        return ok(stream.toByteArray()).as("image/jpg");
    }

    public static Result changeLanguage(String lang) {
//        Controller.clearLang();
//        String title = Messages.get(new Lang(Lang.forCode("fr")), "home.title")
//        flash("lan",language);

        Controller.changeLang(lang);
        Lang currentLang = Controller.lang();

        play.Logger.info("Accept-lang: " + request().acceptLanguages().toString());
        play.Logger.info("网站语言改为：" + currentLang.code()); // eg. zh-CN, en

        if ("zh-CN".equals(currentLang.code())) session("lang", "");
        if ("en".equals(currentLang.code())) session("lang", "En");

        return ok(currentLang.code());
    }
}
