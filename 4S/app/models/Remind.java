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
@TableComment("客户联系提醒")
public class Remind extends Model implements IConst {

    @Id
    public long id;

    @Comment("联系内容")
    @NotNull
    @SearchField
    public String name; // 名称

    @Comment("状态")
    @EnumMap(value = "0,1", name = "6年免检,2年检,1年检,半年检")
    public int status = 0;

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

    @JsonIgnore
    @Comment("对应用户")
    @ManyToMany(targetEntity = User.class)
    public List<User> users;

    public Remind() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, Remind> find = new Finder(Long.class, Remind.class);

    @Override
    public String toString() {
        return "Pop [name:" + name + "]";
    }
}