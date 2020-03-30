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
@TableComment("员工")
public class Staff extends Model implements IConst {

    @Id
    public long id;

    @Comment("姓名")
    @NotNull
    @SearchField
    public String name; // 名称

    @Comment("状态")
    @EnumMap(value = "0,1,2", name = "接车员,维修员,客户经理")
    public int status = 0;

    @Comment("照片")
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

    @JsonIgnore
    @Comment("服务客户")
    @ManyToMany(targetEntity = User.class)
    public List<User> users;

    @JsonIgnore
    @Comment("拜访回访记录")
    @ManyToMany(targetEntity = Visit.class)
    public List<Visit> visits;

    public Staff() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, Staff> find = new Finder(Long.class, Staff.class);

    @Override
    public String toString() {
        return "Pop [name:" + name + "]";
    }
}