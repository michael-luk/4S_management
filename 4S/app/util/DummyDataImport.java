
package util;

import LyLib.Interfaces.IConst;
import com.avaje.ebean.Ebean;
import models.Admin;
import models.AdminJournal;
import models.Car;
import models.Complain;
import models.Config;
import models.Feedback;
import models.Fix;
import models.Info;
import models.Pop;
import models.Product;
import models.Purchase;
import models.Red;
import models.Remind;
import models.Sale;
import models.SmsInfo;
import models.Staff;
import models.TalkSkill;
import models.Ticket;
import models.User;
import models.Visit;
import play.libs.Yaml;

import java.util.List;
import java.util.Map;

public class DummyDataImport implements IConst {
    public static void insert() {
        play.Logger.info("start load dummy data");

        if (Ebean.find(Admin.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("admin");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Admin %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Admin done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Car.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("car");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Car %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Car done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Complain.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("complain");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Complain %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Complain done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Config.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("config");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Config %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Config done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Feedback.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("feedback");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Feedback %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Feedback done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Fix.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("fix");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Fix %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Fix done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Info.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("info");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Info %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Info done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Pop.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("pop");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Pop %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Pop done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Product.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("product");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Product %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Product done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Purchase.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("purchase");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Purchase %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Purchase done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Red.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("red");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Red %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Red done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Remind.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("remind");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Remind %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Remind done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Sale.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("sale");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Sale %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Sale done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(SmsInfo.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("smsInfo");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default SmsInfo %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default SmsInfo done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Staff.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("staff");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Staff %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Staff done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(TalkSkill.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("talkSkill");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default TalkSkill %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default TalkSkill done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Ticket.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("ticket");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Ticket %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Ticket done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(User.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("user");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default User %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default User done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

        if (Ebean.find(Visit.class).findRowCount() == 0) {
            try {
                Map<String, List<Object>> initData = (Map<String, List<Object>>) Yaml.load("initial-data.yml");
                List<Object> defaultObjs = initData.get("visit");
                if (defaultObjs != null) {
                    if (defaultObjs.size() > 0) {
                        Ebean.save(defaultObjs);
                        play.Logger.info(String.format("load dummy default Visit %s", defaultObjs.size()));
                    }
                }
                play.Logger.info("load dummy default Visit done");
            } catch (Exception ex) {
                play.Logger.error(CONFIG_FILE_ISSUE + ": " + ex.getMessage());
            }
        }

    }
}
