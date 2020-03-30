package controllers.gen;

import controllers.*;
import controllers.biz.*;
import play.mvc.WebSocket;
import util.*;
import views.html.*;
import views.html.gen.*;
import LyLib.Interfaces.IConst;
import LyLib.Utils.DateUtil;
import LyLib.Utils.PageInfo;
import LyLib.Utils.StrUtil;
import LyLib.Utils.Msg;
import com.avaje.ebean.Ebean;
import com.avaje.ebean.Page;
import com.avaje.ebean.Query;
import com.avaje.ebean.Transaction;
import java.util.ArrayList;
import models.Remind;
import models.User;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import java.io.File;
import java.io.FileOutputStream;
import play.Play;

import javax.persistence.PersistenceException;

import static controllers.Application.nameChannels;
import static controllers.Application.sendWebSocketByChannelTag;
import static play.data.Form.form;

public class RemindController extends Controller implements IConst {
    
    public static Result remindPage(Integer status, Integer notStatus,
                                     String fieldOn, String fieldValue, boolean isAnd,
                                     String searchOn, String kw,
                                     String startTime, String endTime,
                                     String order, String sort,
                                     Integer page, Integer size) {
        Msg<List<Remind>> msg = BaseController.doGetAll("Remind",
                status, notStatus,
                fieldOn, fieldValue, isAnd,
                searchOn, kw,
                startTime, endTime,
                order, sort,
                page, size);
        
        if (msg.flag) {
            return ok(remind.render(msg.data));
        } else {
            msg.data = new ArrayList<>();
            return ok(msg.message);
        }
    }
    
    @Security.Authenticated(SecuredAdmin.class)
    public static Result remindBackendPage() {
        return ok(remind_backend.render());
    }
    
    public static Result getRemindUsers(Long refId, Integer page, Integer size) {
        if (size == 0)
            size = PAGE_SIZE;
        if (page <= 0)
            page = 1;

        Msg<List<User>> msg = new Msg<>();

        Remind found = Remind.find.byId(refId);
        if (found != null) {
            if (found.users.size() > 0) {
                Page<User> records;
                records = User.find.where().eq("reminds.id", refId).orderBy("id desc").findPagingList(size)
                        .setFetchAhead(false).getPage(page - 1);

                if (records.getTotalRowCount() > 0) {
                    msg.flag = true;

                    PageInfo pageInfo = new PageInfo();
                    pageInfo.current = page;
                    pageInfo.total = records.getTotalRowCount();
                    pageInfo.size = size;
                    if (records.hasPrev())
                        pageInfo.hasPrev = true;
                    if (records.hasNext())
                        pageInfo.hasNext = true;

                    msg.data = records.getList();
                    msg.page = pageInfo;
                    play.Logger.info("result: " + msg.data.size());
                } else {
                    msg.message = NO_FOUND;
                    play.Logger.info("users row result: " + NO_FOUND);
                }
            } else {
                msg.message = NO_FOUND;
                play.Logger.info("users result: " + NO_FOUND);
            }
        } else {
            msg.message = NO_FOUND;
            play.Logger.info("remind result: " + NO_FOUND);
        }
        return ok(Json.toJson(msg));
    }

    @Security.Authenticated(SecuredSuperAdmin.class)
    @MethodName("新增_Remind")
    @Role("create_remind")
    public static Result add() {
        Msg<Remind> msg = new Msg<>();

        Form<RemindParser> httpForm = form(RemindParser.class).bindFromRequest();
        if (!httpForm.hasErrors()) {
            RemindParser formObj = httpForm.get();            
            Remind newObj = new Remind();
            
            String uniqueFieldIssue = BaseController.checkFieldUnique("Remind", formObj);
            if (StrUtil.isNotNull(uniqueFieldIssue)) {
                msg.message = "字段[" + TableInfoReader.getFieldComment("Remind", uniqueFieldIssue)
                        + "]存在同名数据";
                return ok(Json.toJson(msg));
            }

            newObj.name = formObj.name;
            newObj.status = formObj.status;
            newObj.description = formObj.description;
            newObj.comment = formObj.comment;

            if (formObj.users == null) {
                formObj.users = new ArrayList<>();
            }
            newObj.users = formObj.users;
        
            Transaction txn = Ebean.beginTransaction();
            try{
                SaveBiz.beforeSave(newObj);
                Ebean.save(newObj);
                
                for (User jsonRefObj : formObj.users){
                    User dbRefObj = User.find.byId(jsonRefObj.id);
                    dbRefObj.reminds.add(newObj);
                    dbRefObj.save();
                }
                
                txn.commit();
                msg.flag = true;
                msg.data = newObj;
                play.Logger.info("result: " + CREATE_SUCCESS);
                sendWebSocketByChannelTag("remind_backend", "new");
            } catch (PersistenceException ex){
                msg.message = CREATE_ISSUE + ", ex: " + ex.getMessage();
                play.Logger.error(msg.message);
                return ok(Json.toJson(msg));
            } finally {
                txn.end();
            }
            return ok(Json.toJson(msg));
        } else {        
            if (httpForm.hasGlobalErrors())
                msg.message = httpForm.globalError().message();
            else {
                if (httpForm.hasErrors())
                    msg.message = "输入数据不正确, 请重试";
            }
            play.Logger.error("result: " + msg.message);
        }
        return ok(Json.toJson(msg));
    }

    @Security.Authenticated(SecuredSuperAdmin.class)
    @MethodName("修改_Remind")
    @Role("update_remind")
    public static Result update(long id) {
        Msg<Remind> msg = new Msg<>();

        Remind found = Remind.find.byId(id);
        if (found == null) {
            msg.message = NO_FOUND;
            play.Logger.info("result: " + msg.message);
            return ok(Json.toJson(msg));
        }

        Form<RemindParser> httpForm = form(RemindParser.class).bindFromRequest();

        if (!httpForm.hasErrors()) {
            RemindParser formObj = httpForm.get();        
            
            String uniqueFieldIssue = BaseController.checkFieldUnique("Remind", formObj, 1);
            if (StrUtil.isNotNull(uniqueFieldIssue)) {
                msg.message = "字段[" + TableInfoReader.getFieldComment("Remind", uniqueFieldIssue)
                        + "]存在同名数据";
                return ok(Json.toJson(msg));
            }
            
            Transaction txn = Ebean.beginTransaction();
            try{
                found = Remind.find.byId(id);
                            
                found.name = formObj.name;
                found.status = formObj.status;
                found.description = formObj.description;
                found.comment = formObj.comment;

                // 处理多对多 remind <-> User, 先清掉对面的
                for (User refObj : found.users) {
                    if (refObj.reminds.contains(found)) {
                        refObj.reminds.remove(found);
                        refObj.save();
                    }
                }

                // 清掉自己这边的
                found.users = new ArrayList<>();
                found.save();

                // 两边加回
                List<User> allRefUsers = User.find.all();
                if (formObj.users != null) {
                    for (User jsonRefObj : formObj.users) {
                        for (User dbRefObj : allRefUsers) {
                            if (dbRefObj.id == jsonRefObj.id) {
                                if (!found.users.contains(dbRefObj)) {
                                    found.users.add(dbRefObj);
                                }
                                if (!dbRefObj.reminds.contains(found)) {
                                    dbRefObj.reminds.add(found);
                                    dbRefObj.save();
                                }
                                break;
                            }

                        }
                    }
                }
                SaveBiz.beforeUpdate(found);
                Ebean.update(found);
                txn.commit();
                msg.flag = true;
                msg.data = found;
                play.Logger.info("result: " + UPDATE_SUCCESS);
                sendWebSocketByChannelTag("remind_backend", "new");
            } catch (Exception ex){
                msg.message = UPDATE_ISSUE + ", ex: " + ex.getMessage();
                play.Logger.error(msg.message);
            } finally {
                txn.end();
            }
            return ok(Json.toJson(msg));
        } else {     
            if (httpForm.hasGlobalErrors())
                msg.message = httpForm.globalError().message();
            else {
                if (httpForm.hasErrors())
                    msg.message = "输入数据不正确, 请重试";
            }
            play.Logger.error("result: " + msg.message);
        }
        return ok(Json.toJson(msg));
    }
    
    public static class RemindParser {

        public String name;
        public int status;
        public String description;
        public String comment;
        public List<User> users;        

        public String validate() {
            if (StrUtil.isNull(name)) {
                return TableInfoReader.getFieldComment(Remind.class, "name") + "不能为空";
            }

            return null;
        }
    }
    
    @Security.Authenticated(SecuredSuperAdmin.class)
    @MethodName("删除_Remind")
    @Role("dalete_remind")
    public static Result delete(long id) {
        Msg<Remind> msg = new Msg<>();

        Remind found = Remind.find.byId(id);
        if (found != null) {
            Transaction txn = Ebean.beginTransaction();
            try{
                // 解除多对多的关联
                for (User user : found.users) {
                    user.reminds.remove(found);
                    user.save();
                }
                found.users = new ArrayList<>();
                
                found.save();
                Ebean.delete(found);
                txn.commit();
                
                msg.flag = true;
                play.Logger.info("result: " + DELETE_SUCCESS);
                sendWebSocketByChannelTag("remind_backend", "delete");
            } catch (PersistenceException ex){
                msg.message = DELETE_ISSUE + ", ex: " + ex.getMessage();
                play.Logger.error(msg.message);
            } finally {
                txn.end();
            }
        } else {
            msg.message = NO_FOUND;
            play.Logger.info("result: " + NO_FOUND);
        }
        return ok(Json.toJson(msg));
    }

    public static Result getNew() {
        Msg<Remind> msg = new Msg<>();
        msg.flag = true;
        msg.data = new Remind();
        return ok(Json.toJson(msg));
    }
    
    public static File getReportFile(String fileName,
                                     Integer status, Integer notStatus,
                                     String fieldOn, String fieldValue, boolean isAnd,
                                     String searchOn, String kw,
                                     String startTime, String endTime,
                                     String order, String sort) {
    
		// 创建工作薄对象
		HSSFWorkbook workbook2007 = new HSSFWorkbook();
		// 数据
                
        Msg<List<Remind>> msg = BaseController.doGetAll("Remind",
                status, notStatus,
                fieldOn, fieldValue, isAnd,
                searchOn, kw,
                startTime, endTime,
                "createdAt", "desc",
                1, Remind.find.findRowCount());
		List<Remind> list = msg.data;        

        if (list == null || list.size() == 0) return null;

		// 创建单元格样式
		HSSFCellStyle cellStyle = workbook2007.createCellStyle();
		// 设置边框属性
		cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		// 指定单元格居中对齐
		cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		// 指定单元格垂直居中对齐
		cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		// 指定当单元格内容显示不下时自动换行
		cellStyle.setWrapText(true);
		// // 设置单元格字体
		HSSFFont font = workbook2007.createFont();
		font.setFontName("宋体");
		// 大小
		font.setFontHeightInPoints((short) 10);
		// 加粗
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		cellStyle.setFont(font);

		HSSFCellStyle style = workbook2007.createCellStyle();
		// 指定单元格居中对齐
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		// 指定单元格垂直居中对齐
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		HSSFFont font1 = workbook2007.createFont();
		font1.setFontName("宋体");
		font1.setFontHeightInPoints((short) 10);
		// 加粗
		font1.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		style.setFont(font1);

		// 创建工作表对象，并命名
		HSSFSheet sheet2 = workbook2007.createSheet(TableInfoReader.getTableComment(Remind.class) + "报表");
		// 设置列
        sheet2.setColumnWidth(0, 4000);
        sheet2.setDefaultColumnStyle(0, cellStyle);//name
        sheet2.setColumnWidth(1, 4000);
        sheet2.setDefaultColumnStyle(1, cellStyle);//status
        sheet2.setColumnWidth(2, 4000);
        sheet2.setDefaultColumnStyle(2, cellStyle);//last_update_time
        sheet2.setColumnWidth(3, 4000);
        sheet2.setDefaultColumnStyle(3, cellStyle);//created_at
        sheet2.setColumnWidth(4, 4000);
        sheet2.setDefaultColumnStyle(4, cellStyle);//description
        sheet2.setColumnWidth(5, 4000);
        sheet2.setDefaultColumnStyle(5, cellStyle);//comment


		// 创建表头
		HSSFRow title = sheet2.createRow(0);
		title.setHeightInPoints(50);
		title.createCell(0).setCellValue(TableInfoReader.getTableComment(Remind.class) + "报表");
        title.createCell(1).setCellValue("");
        title.createCell(2).setCellValue("");
        title.createCell(3).setCellValue("");
        title.createCell(4).setCellValue("");
        title.createCell(5).setCellValue("");
        sheet2.addMergedRegion(new CellRangeAddress(0, 0, 0, 5));
		HSSFCell ce = title.createCell((short) 1);

		HSSFRow titleRow = sheet2.createRow(1);
        
		// 设置行高
		titleRow.setHeightInPoints(30);
        titleRow.createCell(0).setCellValue(TableInfoReader.getFieldComment(Remind.class, "name"));//name
        titleRow.createCell(1).setCellValue(TableInfoReader.getFieldComment(Remind.class, "status"));//status
        titleRow.createCell(2).setCellValue(TableInfoReader.getFieldComment(Remind.class, "lastUpdateTime"));//last_update_time
        titleRow.createCell(3).setCellValue(TableInfoReader.getFieldComment(Remind.class, "createdAt"));//created_at
        titleRow.createCell(4).setCellValue(TableInfoReader.getFieldComment(Remind.class, "description"));//description
        titleRow.createCell(5).setCellValue(TableInfoReader.getFieldComment(Remind.class, "comment"));//comment
		HSSFCell ce2 = title.createCell((short) 2);
		ce2.setCellStyle(cellStyle); // 样式，居中

		// 遍历集合对象创建行和单元格
        int i;
		for (i = 0; i < list.size(); i++) {
			// 取出对象
			Remind item = list.get(i);
			// 创建行
			HSSFRow row = sheet2.createRow(i + 2);
			// 创建单元格并赋值
            HSSFCell cell0 = row.createCell(0);
            if (item.name == null) {
                cell0.setCellValue("");
            } else {
                cell0.setCellValue(item.name);
            }
            HSSFCell cell1 = row.createCell(1);
            cell1.setCellValue(EnumInfoReader.getEnumName(Remind.class, "status", item.status));
            HSSFCell cell2 = row.createCell(2);
            cell2.setCellValue(DateUtil.Date2Str(item.lastUpdateTime));
            HSSFCell cell3 = row.createCell(3);
            cell3.setCellValue(DateUtil.Date2Str(item.createdAt));
            HSSFCell cell4 = row.createCell(4);
            if (item.description == null) {
                cell4.setCellValue("");
            } else {
                cell4.setCellValue(item.description);
            }
            HSSFCell cell5 = row.createCell(5);
            if (item.comment == null) {
                cell5.setCellValue("");
            } else {
                cell5.setCellValue(item.comment);
            }
		}

		// 生成文件
		String path = Play.application().path().getPath() + "/public/report/" + fileName;
		File file = new File(path);
        
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(file);
			workbook2007.write(fos);
		} catch (Exception e) {
            play.Logger.error("生成报表出错: " + e.getMessage());
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (Exception e) {
                    play.Logger.error("生成报表出错, 关闭流出错: " + e.getMessage());
				}
			}
		}
        return file;
    }

    @Security.Authenticated(SecuredAdmin.class)
    @MethodName("导出报表_Remind")
    @Role("report_remind")
	public static Result report(Integer status, Integer notStatus,
                                String fieldOn, String fieldValue, boolean isAnd,
                                String searchOn, String kw,
                                String startTime, String endTime,
                                String order, String sort) {
                                
		String fileName = TableInfoReader.getTableComment(Remind.class) + "报表_" + DateUtil.NowString("yyyy_MM_dd_HH_mm_ss") + ".xls";
        File file = getReportFile(fileName, status, notStatus, fieldOn, fieldValue, isAnd, searchOn, kw,
                startTime, endTime, order, sort);

        if (file == null) {
            if (StrUtil.isNotNull(startTime) && StrUtil.isNotNull(endTime)) {
                return ok("日期: " + startTime + " 至 " + endTime + ", 报表" + NO_FOUND + ", 请返回重试!");
            }
            return ok(NO_FOUND);
        }
        
        // 处理中文报表名
        String agent = request().getHeader("USER-AGENT");
        String downLoadName = null;
        try {
            if (null != agent && -1 != agent.indexOf("MSIE"))   //IE
            {
                downLoadName = java.net.URLEncoder.encode(fileName, "UTF-8");
            } else if (null != agent && -1 != agent.indexOf("Mozilla")) //Firefox
            {
                downLoadName = new String(fileName.getBytes("UTF-8"), "iso-8859-1");
            } else {
                downLoadName = java.net.URLEncoder.encode(fileName, "UTF-8");
            }
        } catch (UnsupportedEncodingException ex) {
            play.Logger.error("导出报表处理中文报表名出错: " + ex.getMessage());
        }
        if (downLoadName != null) {
            response().setHeader("Content-disposition", "attachment;filename="
                    + downLoadName);
            response().setContentType("application/vnd.ms-excel;charset=UTF-8");
        }
        
		return ok(file);
	}
}
