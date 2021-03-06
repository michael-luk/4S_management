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
@TableComment("车辆")
public class Car extends Model implements IConst {

    @Id
    public long id;

    @Comment("车牌")
    @NotNull
    @SearchField
    public String name; // 名称

    @Comment("分类")
    public String classify;// 分类

    @Comment("接车线索")
    @EnumMap(value = "0,1,2,3", name = "上门客,朋友介绍,广告,网络")
    public int status = 0;

    @Comment("VIP")
    public boolean isVip;

    @Comment("脱检记录")
    @EnumMap(value = "0,1,2,3", name = "已脱审1年,已脱审2年,已脱审3年或以上,已在其他检测站检测")
    public int leaveRecordEnum = 1;

    @Comment("脱检原因")
    public String leaveReason;

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

    @Comment("车主用户ID")
    public long refUserId;// 用户ID

    @JsonIgnore
    @Comment("车主")
    @ManyToOne
    public User user;

    @Comment("检车信息")
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "car")
    public List<Fix> fixs;

    public Car() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, Car> find = new Finder(Long.class, Car.class);

    @Override
    public String toString() {
        return "Pop [name:" + name + "]";
    }
}