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
@TableComment("投诉")
public class Complain extends Model implements IConst {

    @Id
    public long id;

    @Comment("投诉内容")
    @NotNull
    @SearchField
    public String name; // 名称

    @Comment("投诉等级")
    @EnumMap(value = "0,1,2", name = "非常不满,不满,一般")
    public int status = 0;

    @Column(columnDefinition = "varchar(1000)")
    @Comment("描述")
    public String description;

    @Comment("用户ID")
    public long refUserId;// 用户ID

    @JsonIgnore
    @Comment("对应用户")
    @ManyToOne
    public User user;

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

    public Complain() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, Complain> find = new Finder(Long.class, Complain.class);

    @Override
    public String toString() {
        return "Pop [name:" + name + "]";
    }
}