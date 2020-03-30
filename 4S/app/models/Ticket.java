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
@TableComment("接车派单")
public class Ticket extends Model implements IConst {

    @Id
    public long id;

    @Comment("工作内容")
    @NotNull
    @SearchField
    public String name; // 名称

    @Comment("状态")
    @EnumMap(value = "0,1", name = "已出发,已接车,未能接车")
    public int status = 0;

    @Column(columnDefinition = "varchar(1000)")
    @Comment("情况描述")
    public String description;

    @Comment("图片")
    @Lob
    public String images; // 图片(多个图片逗号分隔)

    @Comment("修改时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date lastUpdateTime;

    @Comment("创建日期")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date createdAt; // 创建日期

    @Comment("备注")
    public String comment;

    @Comment("客户ID")
    public long refUserId;// 用户ID

    @JsonIgnore
    @Comment("对应客户")
    @ManyToOne
    public User user;

    @Comment("员工ID")
    public long refStaffId;// 用户ID

    @JsonIgnore
    @Comment("分配员工")
    @ManyToOne
    public Staff staff;

    public Ticket() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, Ticket> find = new Finder(Long.class, Ticket.class);

    @Override
    public String toString() {
        return "Pop [name:" + name + "]";
    }
}