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
import models.Info;
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

public class InfoController extends Controller implements IConst {
    
    public static Result infoPage(Integer status, Integer notStatus,
                                     String fieldOn, String fieldValue, boolean isAnd,
                                     String searchOn, String kw,
                                     String startTime, String endTime,
                                     String order, String sort,
                                     Integer page, Integer size) {
        Msg<List<Info>> msg = BaseController.doGetAll("Info",
                status, notStatus,
                fieldOn, fieldValue, isAnd,
                searchOn, kw,
                startTime, endTime,
                order, sort,
                page, size);
        
        if (msg.flag) {
            return ok(info.render(msg.data));
        } else {
            msg.data = new ArrayList<>();
            return ok(msg.message);
        }
    }
    
    @Security.Authenticated(SecuredAdmin.class)
    public static Result infoBackendPage() {
        return ok(info_backend.render());
    }
    

    @Security.Authenticated(SecuredSuperAdmin.class)
    @MethodName("新增_Info")
    @Role("create_info")
    public static Result add() {
        Msg<Info> msg = new Msg<>();

        Form<InfoParser> httpForm = form(InfoParser.class).bindFromRequest();
        if (!httpForm.hasErrors()) {
            InfoParser formObj = httpForm.get();            
            Info newObj = new Info();
            
            String uniqueFieldIssue = BaseController.checkFieldUnique("Info", formObj);
            if (StrUtil.isNotNull(uniqueFieldIssue)) {
                msg.message = "字段[" + TableInfoReader.getFieldComment("Info", uniqueFieldIssue)
                        + "]存在同名数据";
                return ok(Json.toJson(msg));
            }

            newObj.name = formObj.name;
            newObj.classify = formObj.classify;
            newObj.phone = formObj.phone;
            newObj.url = formObj.url;
            newObj.visible = formObj.visible;
            newObj.status = formObj.status;
            newObj.images = formObj.images;
            newObj.smallImages = formObj.smallImages;
            newObj.description1 = formObj.description1;
            newObj.description2 = formObj.description2;
            newObj.comment = formObj.comment;

            Transaction txn = Ebean.beginTransaction();
            try{
                SaveBiz.beforeSave(newObj);
                Ebean.save(newObj);
                
                
                txn.commit();
                msg.flag = true;
                msg.data = newObj;
                play.Logger.info("result: " + CREATE_SUCCESS);
                sendWebSocketByChannelTag("info_backend", "new");
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
    @MethodName("修改_Info")
    @Role("update_info")
    public static Result update(long id) {
        Msg<Info> msg = new Msg<>();

        Info found = Info.find.byId(id);
        if (found == null) {
            msg.message = NO_FOUND;
            play.Logger.info("result: " + msg.message);
            return ok(Json.toJson(msg));
        }

        Form<InfoParser> httpForm = form(InfoParser.class).bindFromRequest();

        if (!httpForm.hasErrors()) {
            InfoParser formObj = httpForm.get();        
            
            String uniqueFieldIssue = BaseController.checkFieldUnique("Info", formObj, 1);
            if (StrUtil.isNotNull(uniqueFieldIssue)) {
                msg.message = "字段[" + TableInfoReader.getFieldComment("Info", uniqueFieldIssue)
                        + "]存在同名数据";
                return ok(Json.toJson(msg));
            }
            
            Transaction txn = Ebean.beginTransaction();
            try{
                found = Info.find.byId(id);
                            
                found.name = formObj.name;
                found.classify = formObj.classify;
                found.phone = formObj.phone;
                found.url = formObj.url;
                found.visible = formObj.visible;
                found.status = formObj.status;
                found.images = formObj.images;
                found.smallImages = formObj.smallImages;
                found.description1 = formObj.description1;
                found.description2 = formObj.description2;
                found.comment = formObj.comment;

                SaveBiz.beforeUpdate(found);
                Ebean.update(found);
                txn.commit();
                msg.flag = true;
                msg.data = found;
                play.Logger.info("result: " + UPDATE_SUCCESS);
                sendWebSocketByChannelTag("info_backend", "new");
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
    
    public static class InfoParser {

        public String name;
        public String classify;
        public String phone;
        public String url;
        public boolean visible;
        public int status;
        public String images;
        public String smallImages;
        public String description1;
        public String description2;
        public String comment;

        public String validate() {
            if (StrUtil.isNull(name)) {
                return TableInfoReader.getFieldComment(Info.class, "name") + "不能为空";
            }

            return null;
        }
    }
    

    public static Result getNew() {
        Msg<Info> msg = new Msg<>();
        msg.flag = true;
        msg.data = new Info();
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
                
        Msg<List<Info>> msg = BaseController.doGetAll("Info",
                status, notStatus,
                fieldOn, fieldValue, isAnd,
                searchOn, kw,
                startTime, endTime,
                "createdAt", "desc",
                1, Info.find.findRowCount());
		List<Info> list = msg.data;        

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
		HSSFSheet sheet2 = workbook2007.createSheet(TableInfoReader.getTableComment(Info.class) + "报表");
		// 设置列
        sheet2.setColumnWidth(0, 4000);
        sheet2.setDefaultColumnStyle(0, cellStyle);//name
        sheet2.setColumnWidth(1, 4000);
        sheet2.setDefaultColumnStyle(1, cellStyle);//classify
        sheet2.setColumnWidth(2, 4000);
        sheet2.setDefaultColumnStyle(2, cellStyle);//phone
        sheet2.setColumnWidth(3, 4000);
        sheet2.setDefaultColumnStyle(3, cellStyle);//url
        sheet2.setColumnWidth(4, 4000);
        sheet2.setDefaultColumnStyle(4, cellStyle);//visible
        sheet2.setColumnWidth(5, 4000);
        sheet2.setDefaultColumnStyle(5, cellStyle);//status
        sheet2.setColumnWidth(6, 4000);
        sheet2.setDefaultColumnStyle(6, cellStyle);//last_update_time
        sheet2.setColumnWidth(7, 4000);
        sheet2.setDefaultColumnStyle(7, cellStyle);//created_at
        sheet2.setColumnWidth(8, 4000);
        sheet2.setDefaultColumnStyle(8, cellStyle);//description1
        sheet2.setColumnWidth(9, 4000);
        sheet2.setDefaultColumnStyle(9, cellStyle);//description2
        sheet2.setColumnWidth(10, 4000);
        sheet2.setDefaultColumnStyle(10, cellStyle);//comment


		// 创建表头
		HSSFRow title = sheet2.createRow(0);
		title.setHeightInPoints(50);
		title.createCell(0).setCellValue(TableInfoReader.getTableComment(Info.class) + "报表");
        title.createCell(1).setCellValue("");
        title.createCell(2).setCellValue("");
        title.createCell(3).setCellValue("");
        title.createCell(4).setCellValue("");
        title.createCell(5).setCellValue("");
        title.createCell(6).setCellValue("");
        title.createCell(7).setCellValue("");
        title.createCell(8).setCellValue("");
        title.createCell(9).setCellValue("");
        title.createCell(10).setCellValue("");
        sheet2.addMergedRegion(new CellRangeAddress(0, 0, 0, 10));
		HSSFCell ce = title.createCell((short) 1);

		HSSFRow titleRow = sheet2.createRow(1);
        
		// 设置行高
		titleRow.setHeightInPoints(30);
        titleRow.createCell(0).setCellValue(TableInfoReader.getFieldComment(Info.class, "name"));//name
        titleRow.createCell(1).setCellValue(TableInfoReader.getFieldComment(Info.class, "classify"));//classify
        titleRow.createCell(2).setCellValue(TableInfoReader.getFieldComment(Info.class, "phone"));//phone
        titleRow.createCell(3).setCellValue(TableInfoReader.getFieldComment(Info.class, "url"));//url
        titleRow.createCell(4).setCellValue(TableInfoReader.getFieldComment(Info.class, "visible"));//visible
        titleRow.createCell(5).setCellValue(TableInfoReader.getFieldComment(Info.class, "status"));//status
        titleRow.createCell(6).setCellValue(TableInfoReader.getFieldComment(Info.class, "lastUpdateTime"));//last_update_time
        titleRow.createCell(7).setCellValue(TableInfoReader.getFieldComment(Info.class, "createdAt"));//created_at
        titleRow.createCell(8).setCellValue(TableInfoReader.getFieldComment(Info.class, "description1"));//description1
        titleRow.createCell(9).setCellValue(TableInfoReader.getFieldComment(Info.class, "description2"));//description2
        titleRow.createCell(10).setCellValue(TableInfoReader.getFieldComment(Info.class, "comment"));//comment
		HSSFCell ce2 = title.createCell((short) 2);
		ce2.setCellStyle(cellStyle); // 样式，居中

		// 遍历集合对象创建行和单元格
        int i;
		for (i = 0; i < list.size(); i++) {
			// 取出对象
			Info item = list.get(i);
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
            if (item.classify == null) {
                cell1.setCellValue("");
            } else {
                cell1.setCellValue(item.classify);
            }
            HSSFCell cell2 = row.createCell(2);
            if (item.phone == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(item.phone);
            }
            HSSFCell cell3 = row.createCell(3);
            if (item.url == null) {
                cell3.setCellValue("");
            } else {
                cell3.setCellValue(item.url);
            }
            HSSFCell cell4 = row.createCell(4);
            cell4.setCellValue(item.visible ? "是" : "否");
            HSSFCell cell5 = row.createCell(5);
            cell5.setCellValue(EnumInfoReader.getEnumName(Info.class, "status", item.status));
            HSSFCell cell6 = row.createCell(6);
            cell6.setCellValue(DateUtil.Date2Str(item.lastUpdateTime));
            HSSFCell cell7 = row.createCell(7);
            cell7.setCellValue(DateUtil.Date2Str(item.createdAt));
            HSSFCell cell8 = row.createCell(8);
            if (item.description1 == null) {
                cell8.setCellValue("");
            } else {
                cell8.setCellValue(item.description1);
            }
            HSSFCell cell9 = row.createCell(9);
            if (item.description2 == null) {
                cell9.setCellValue("");
            } else {
                cell9.setCellValue(item.description2);
            }
            HSSFCell cell10 = row.createCell(10);
            if (item.comment == null) {
                cell10.setCellValue("");
            } else {
                cell10.setCellValue(item.comment);
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
    @MethodName("导出报表_Info")
    @Role("report_info")
	public static Result report(Integer status, Integer notStatus,
                                String fieldOn, String fieldValue, boolean isAnd,
                                String searchOn, String kw,
                                String startTime, String endTime,
                                String order, String sort) {
                                
		String fileName = TableInfoReader.getTableComment(Info.class) + "报表_" + DateUtil.NowString("yyyy_MM_dd_HH_mm_ss") + ".xls";
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
