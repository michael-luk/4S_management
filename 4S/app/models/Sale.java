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
import java.util.Date;
import java.util.List;

@Entity
@TableComment("拼团")
public class Sale extends Model implements IConst {

    @Id
    public long id;

    @Comment("编号")
    public String showNo; //

    @Comment("名称")
    @SearchField
    public String name; // 名称

    @Comment("卖出数")
    public int soldNumber;

    @Comment("修改时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date lastUpdateTime;

    @Comment("创建日期")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date createdAt;

    @Comment("截止时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date endTime;

    @Comment("图片")
    @Column(columnDefinition = "varchar(400)")
    public String images; // 图片(多个图片逗号分隔)

    @Column(columnDefinition = "varchar(2000)")
    @Comment("描述")
    public String description;

    @Comment("备注")
    public String comment;

    @Comment("拼团价")
    @Column(columnDefinition = "Decimal(10,2)")
    public double price = 0D; //

    @Comment("原价")
    @Column(columnDefinition = "Decimal(10,2)")
    public double originalPrice = 0D; //

    @Comment("状态")
    @EnumMap(value = "0,1,2", name = "正常,隐藏,删除")
    public int status = 0; //  0正常, 1隐藏, 2删除

//    @Comment("商品评论")
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
//    public List<CommentInfo> commentInfos;

    @Comment("所属商品")
    @ManyToMany(targetEntity = Product.class)
    public List<Product> products;

    @JsonIgnore
    @Comment("参加用户")
    @ManyToMany(targetEntity = User.class)
    public List<User> users;

    public Sale() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, Sale> find = new Finder(Long.class, Sale.class);

    public String toString() {
        return "Product [name:" + name + "]";
    }
}
