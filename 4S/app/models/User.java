package models;

import LyLib.Interfaces.IConst;
import com.avaje.ebean.Ebean;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import play.db.ebean.Model;
import util.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
@TableComment("客户")
@OnlyAdminGet
public class User extends Model implements IConst {

    @Id
    public long id;

    @Comment("昵称")
    public String name;

    @Comment("第三方ID")
    public String thirdId;

    @NotNull
    @SearchField
    @Comment("登录名")
    public String loginName;

    @Comment("email")
    public String email;        //用于找回密码, 如果loginName约定是email, 则此字段可以不要

    @Comment("email已验证")
    public boolean isEmailVerified;

    @Comment("email临时key")
    public String emailKey;     //找回密码, 或验证邮箱时暂存的key

    @Comment("email超时")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date emailOverTime;  //找回密码, 或验证邮箱时暂存的过期时间

    @NotNull
    @Comment("密码")
    public String password;

    @Comment("头像")
    public String headImage;

    @Comment("图片")
    @Lob
    public String images; // 图片(多个图片逗号分隔)

    @Comment("性别")
    @EnumMap(value = "0,1,2", name = "未设定,男,女")
    public int sexEnum;

    @Comment("联系电话")
    public String phone;

    @Comment("身份证")
    public String cardNumber;

    @Comment("国家")
    public String country;

    @Comment("省份")
    public String province;

    @Comment("城市")
    public String city;

    @Comment("区域")
    public String zone;

    @Comment("地址")
    public String address;

    @Comment("出生")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    public Date birth;

    @Comment("修改时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date lastUpdateTime;

    @Comment("创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date createdAt;

    @Comment("最后登录IP")
    public String lastLoginIp;// 最后一次登录的IP(只是管理员登录才会记录)

    @Comment("最后登录时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date lastLoginTime;

    @Comment("最后登录IP区域")
    public String lastLoginIpArea; // IP所在区域

    @Comment("状态")
    @EnumMap(value = "0,1", name = "正常,冻结")
    public int status = 0;     // 0-正常, 1-冻结

    @Comment("等级")
    @EnumMap(value = "0,1", name = "普通用户,高级用户")
    public int userRoleEnum = 1; // 状态: 0普通用户, 1管理员, 2超级管理员

    @Column(columnDefinition = "varchar(1000)")
    @Comment("备注")
    public String comment;

    @Comment("用户的推送")
    @ManyToMany(targetEntity = Pop.class)
    public List<Pop> pops;

    @Comment("用户的红包")
    @ManyToMany(targetEntity = Red.class)
    public List<Red> reds;

    @Comment("用户的提醒")
    @ManyToMany(targetEntity = Remind.class)
    public List<Remind> reminds;

    @Comment("所下订单")
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    public List<Purchase> purchases;

    @Comment("车辆")
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    public List<Car> cars;

    @Comment("接待员工")
    @ManyToMany(targetEntity = Staff.class)
    public List<Staff> staffs;

    @Comment("拜访回访记录")
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    public List<Visit> visits;

    @Comment("满意度")
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    public List<Feedback> feedbacks;

    @Comment("投诉")
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    public List<Complain> complains;

    @Comment("用户参加的拼团")
    @ManyToMany(targetEntity = Sale.class)
    public List<Sale> sales;

    public User() {
        createdAt = new Date();
    }

    public void save() {
        lastUpdateTime = new Date();
        Ebean.save(this);
    }

    public static Finder<Long, User> find = new Finder(Long.class, User.class);

    @Override
    public String toString() {
        return "user [name:" + name + "]";
    }
}
