package models;

import LyLib.Interfaces.IConst;
import com.avaje.ebean.Ebean;
import com.fasterxml.jackson.annotation.JsonFormat;
import play.db.ebean.Model;
import util.Comment;
import util.EnumMap;
import util.SearchField;
import util.TableComment;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@TableComment("话术管理")
public class TalkSkill extends Model implements IConst {

    @Id
    public long id;

    @Comment("问题")
    @NotNull
    @SearchField
    public String name; // 名称

    @Comment("答案")
    public String answer;// 分类

    @Comment("状态")
    @EnumMap(value = "0,1", name = "正常,删除")
    public int status; // test using

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
    @Comment("描述")
    public String description;

    @Comment("备注")
    public String comment;

    public TalkSkill() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, TalkSkill> find = new Finder(Long.class, TalkSkill.class);

    @Override
    public String toString() {
        return "Info [name:" + name + "]";
    }
}