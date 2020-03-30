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
@TableComment("推送消息")
public class Pop extends Model implements IConst {

    @Id
    public long id;

    @Comment("标题")
    @NotNull
    @SearchField
    public String name; // 名称

    @Comment("分类")
    public String classify;// 分类

    @Comment("状态")
    @EnumMap(value = "0,1", name = "未发送,已发送")
    public int status = 0;

    @Comment("图片")
    @Lob
    public String images; // 图片(多个图片逗号分隔)

    @Comment("小图片")
    @Lob
    public String smallImages; // 小图片

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
    @Comment("对应用户")
    @ManyToMany(targetEntity = User.class)
    public List<User> users;

    public Pop() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, Pop> find = new Finder(Long.class, Pop.class);

    @Override
    public String toString() {
        return "Pop [name:" + name + "]";
    }
}