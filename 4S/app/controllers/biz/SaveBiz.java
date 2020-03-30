package controllers.biz;

import models.*;

import java.util.Date;

public class SaveBiz {

    public static void beforeSave(Admin obj) {

    }

    public static void beforeUpdate(Admin obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(AdminJournal obj) {

    }

    public static void beforeUpdate(AdminJournal obj) {
    }

    public static void beforeSave(Car obj) {

    }

    public static void beforeUpdate(Car obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Complain obj) {

    }

    public static void beforeUpdate(Complain obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Config obj) {

    }

    public static void beforeUpdate(Config obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Feedback obj) {

    }

    public static void beforeUpdate(Feedback obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Fix obj) {

    }

    public static void beforeUpdate(Fix obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Info obj) {

    }

    public static void beforeUpdate(Info obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Pop obj) {

    }

    public static void beforeUpdate(Pop obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Product obj) {

    }

    public static void beforeUpdate(Product obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Purchase obj) {

    }

    public static void beforeUpdate(Purchase obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Red obj) {

    }

    public static void beforeUpdate(Red obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Remind obj) {

    }

    public static void beforeUpdate(Remind obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Sale obj) {

    }

    public static void beforeUpdate(Sale obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(SmsInfo obj) {

    }

    public static void beforeUpdate(SmsInfo obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Staff obj) {

    }

    public static void beforeUpdate(Staff obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(TalkSkill obj) {

    }

    public static void beforeUpdate(TalkSkill obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Ticket obj) {

    }

    public static void beforeUpdate(Ticket obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(User obj) {

    }

    public static void beforeUpdate(User obj) {
        obj.lastUpdateTime = new Date();
    }

    public static void beforeSave(Visit obj) {

    }

    public static void beforeUpdate(Visit obj) {
        obj.lastUpdateTime = new Date();
    }
}