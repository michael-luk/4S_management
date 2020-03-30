package models;

import LyLib.Interfaces.IConst;
import com.avaje.ebean.Ebean;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import play.db.ebean.Model;
import util.Comment;
import util.EnumMap;
import util.SearchField;
import util.TableComment;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@TableComment("外出拜访外勤跟踪")
public class Visit extends Model implements IConst {

    @Id
    public long id;

    @Comment("功能内容")
    @NotNull
    @SearchField
    public String name; // 名称

    @Comment("分类")
    @EnumMap(value = "0,1", name = "拜访客户,回访")
    public int status = 0;

    @Comment("状态")
    @EnumMap(value = "0,1", name = "未完成,已完成")
    public int typeEnum = 1;

    @Comment("图片")
    @Lob
    public String images; // 图片(多个图片逗号分隔)

    @Comment("修改时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date lastUpdateTime;

    @Comment("创建日期")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date createdAt; // 创建日期

    @Column(columnDefinition = "varchar(1000)")
    @Comment("描述1")
    public String description1;

    @Column(columnDefinition = "varchar(1000)")
    @Comment("描述2")
    public String description2;

    @Comment("备注")
    public String comment;

    @Comment("客户ID")
    public long refUserId;// 用户ID

    @JsonIgnore
    @Comment("对应客户")
    @ManyToOne
    public User user;

    @Comment("分配员工")
    @ManyToMany(targetEntity = Staff.class)
    public List<Staff> staffs;

    public Visit() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, Visit> find = new Finder(Long.class, Visit.class);

    @Override
    public String toString() {
        return "Pop [name:" + name + "]";
    }
}