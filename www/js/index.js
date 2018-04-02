
var months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUN','JULY','AUGUST','SEPTEMBER','OCTOMBER','NOVEMBER','DECEMBER'];
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // pushInitialization();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       checkPermissions();
      makeDB();
window.addEventListener('keyboardDidHide', keyboardClose);
            window.addEventListener('keyboardDidShow', keyboardOpen);
    }
};

app.initialize();

var getDate={
    monthByNum:function(){
        var dateOb=new Date();
     return  dateOb.getMonth(); // 0
    },
    today:function(){
        var dateOb=new Date();
     return  dateOb.getDate(); // 21
    },
    year:function(){
        var dateOb=new Date();
     return  dateOb.getFullYear(); //2018
    },
     monthByName:function(){
        var dateOb=new Date();
     return  months[dateOb.getMonth()]; // JANUARY
    },
    fullDate:function(){
        var dateOb = new Date();
    return (dateOb.getFullYear() + '-' + getDate.monthByName() + '-' + dateOb.getDate());
    }
}
// app version and app name
// cordova plugin add cordova-plugin-app-version
//https://github.com/whiteoctober/cordova-plugin-app-version
function getAppVersion(){
    cordova.getAppVersion.getVersionNumber(function (version) {
    alert(version);
});
}
function getAppName(){
    cordova.getAppName.getVersionNumber(function (version) {
    alert(version);
});
}

// cordova plugin device, know platform device 
// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/
// cordova plugin add cordova-plugin-device --save device.cordova device.model device.platform device.uuid device.version device.manufacturer device.isVirtual device.serial
function platform(){
 console.log(device.cordova);
   var platform = device.platform;
   var version = device.version;
var manufacturer=device.manufacturer;
var model=device.model;
var uuid = device.uuid;
}

// push plugin code
// cordova plugin add phonegap-plugin-push --save
// https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/INSTALLATION.md
// As of version 2.0.0 the SENDER_ID parameter has been removed at install time.
//Instead you put your google-services.json (Android) and/or GoogleService-Info.
// plist in the root folder of your project and then add the following lines into your config.xml.
// <platform name="android">
//   <resource-file src="google-services.json" target="app/google-services.json" />
// </platform>

function pushInitialization(){
            push= PushNotification.init({
 android: {
        senderID: 956432534015 //replace sender id with your id from google
 },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
 ios: {
     alert: "true",
     badge: "true",
     sound: "true"
 },
 windows: {}
});
}
 // push.on('registration', function (data) {
 //            console.log(data.registrationId);
 //            console.log(data.registrationType);
 //        });

 //        push.on('notification', function (data) {
 //            console.log(data.message);
 //            console.log(data.title);
 //            console.log(data.count);
 //            console.log(data.sound);
 //            console.log(data.image);
 //            console.log(data.additionalData);
 //        });
 //        push.on('error', function (e) {
 //            console.log(e.message);
 //        });

// push end

// facebook
// https://github.com/jeduan/cordova-plugin-facebook4
// facebook end


// keyboard plugin
// https://github.com/ionic-team/cordova-plugin-ionic-keyboard
// add to confix xml <preference name="KeyboardResize" value="true" />
// true: Showing/hiding the keyboard will trigger some kind of resizing of the app (see KeyboardResizeMode)
// false: Web will not be resized when the keyboard shows up.

function keyboardOpen() {
    // navigator.vibrate(100);
    alert('keyboardOpen');
}

function keyboardClose() {
    // navigator.vibrate(100);
    alert('keyboardClose');
}

function checkPermissions() {
    //need plugin https://github.com/NeoLSN/cordova-plugin-android-permissions
    var permissions = cordova.plugins.permissions;
permissions.hasPermission(permissions.READ_SMS, function (status) {
        if (status.hasPermission) {
            console.log("hasPermission :READ_SMS");
        } else {
           permissions.requestPermission(permissions.READ_SMS, success, error);

           function error() {
               console.warn('READ_SMS permission is not turned on');
           }

           function success(status) {
               if (!status.hasPermission) error();
           }
        }
    });
}


// sms code start
// require plugin https://github.com/floatinghotpot/cordova-plugin-sms

$('#sms').on('click',function () {
    // var number=$('#mobile').val();
     var number='9860345633';
        startSms();
    getSms(number);
 
});

var getSms = function (number) {
//call sms api using ajax
           
}
function startSms() {
     if (SMS) SMS.startWatch(function () {
         console.log('success to start SMS watching');
         document.addEventListener('onSMSArrive', onSMSArrive);
     }, function () {
         console.log('failed to start SMS watching');
     });
}
            function onSMSArrive(e) {

                alert('onSMSArrive');

                var sms = e.data;
                console.log(e);
                console.log(e.data);
                console.log(sms["body"]);
                
                
                var sms_body = sms["body"];
// .indexOf("BazaarBhav") > -1
                if (sms_body) {
                    var pin = sms_body.split('is')[0].trim();
                    console.log(pin);
                    $('#otp').val(pin);
                    // clearTimeout(myTime);

                    // $("#popup_ok").click();

                    // $("#popup_overlay").removeClass("newOverlay");

                    if (SMS) SMS.stopWatch(function () {

                        console.log('watching stopped');

                    }, function () {

                        console.log('failed to stop watching');
                    });
                }
            }
// sms code end


// database start 
var database = {
    insert: function (expense_name, price, id) {
        var d = mydate();
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO expense (id,expense_name,price,date) VALUES (?,?,?,?)', [id,expense_name, price, d]);
        }, function (error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function () {
            console.log('Populated database OK');
        });
    },
    delete:function(id) {

        db.transaction(function (tx) {

            var query = "DELETE FROM expense WHERE id = ?";
            console.log(query,id);
            
            tx.executeSql(query, [id], function (tx, res) {
                console.log("removeId: " + res);
                console.log("rowsAffected: " + res.rowsAffected);
            },
                function (tx, error) {
                    console.log('DELETE error: ' + error.message);
                });
        }, function (error) {
            console.log('DELETE transaction error: ' + error.message);
        }, function () {
            console.log('DELETE transaction ok');
        });
    }
    ,
    configInsert: function (budget, spend, month) {
        db.transaction(function (tx) {
            var q = "UPDATE config SET budget = ? ,spend =? WHERE month = ?";
            tx.executeSql('INSERT INTO config (budget,spend,month) VALUES (?,?,?)', [budget, spend,month]);
        }, function (error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function () {
            console.log('config');
        });

    },
    configUpdate: function (budget, spend, month) {
        db.transaction(function (tx) {
            var q = "UPDATE config SET budget = ? ,spend =? WHERE month = ?";
            tx.executeSql(q, [budget, spend, month]);
        }, function (error) {
            console.log('Transaction update ERROR: ' + error.message);
        }, function () {
            console.log('config update');
        });
    }
    ,
    selectConfig: function (loadConfig) {
        try {
             db.transaction(function (transaction) {
            var result = [];
            transaction.executeSql('SELECT * FROM config', [], function (tx, results) {
                // var len = results.rows.length,i;
                // for (i = 0; i < len; i++) {
                //     result[i] = {
                //      id: results.rows.item(i).id,
                //         // expense_name: results.rows.item(i).expense_name,
                //         // price: results.rows.item(i).price,
                //         // date: results.rows.item(i).date,
                //     }
                //     console.log(results.rows.item(i).id);
                // }
                var len = results.rows.length;
                if(len>0)
                {
                loadConfig(results);
                }
            }, null);

        });
        } catch(e) {
            // statements
            console.log(e);
        }
       

    }
    ,
    selectAll: function (showAll) {
        db.transaction(function (transaction) {
            var result=[];
            transaction.executeSql('SELECT * FROM expense', [], function (tx, results) {
                showAll(results);
            }, null);
        });
    }
}

function makeDB() {
    try {
        db = window.sqlitePlugin.openDatabase({
            name: "expense.db",
            location: 'default',
             androidDatabaseImplementation: 2,
                 androidLockWorkaround: 1
        },successcb,errorcb);
      function successcb() {
              db.transaction(function (tx) {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS expense (id INTEGER PRIMARY KEY,expense_name, price , date DATE , uid )');
                  tx.executeSql('CREATE TABLE IF NOT EXISTS config (id INTEGER PRIMARY KEY,budget,spend, month unique)');
              }, function (error) {
                  console.log('makeDB Transaction ERROR: ' + error);
              }, function () {
                  console.log('Populated database OK');
                  // database.selectConfig(loadConfig);
                  
              });
      }
      function errorcb(error) {
          console.log('sqlitePlugin:' + JSON.stringify(error));
          throw "sqlitePlugin failed";
      }
    } catch (error) {
        if (window.openDatabase)
        {
              db = window.openDatabase("expense.db", '1.0', 'Expense Database', 2 * 1024 * 1024);
              db.transaction(function (tx) {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS expense (id INTEGER PRIMARY KEY,expense_name, price , date DATE , uid )');
                  tx.executeSql('CREATE TABLE IF NOT EXISTS config (id INTEGER PRIMARY KEY,budget,spend, month unique)');
              }, function (error) {
                  console.log('makeDB Transaction ERROR: ' + error.message);
              }, function () {
                  console.log('Populated database OK');
                  database.selectAll(showAll);
                  console.log('database object: ',database);
                  // database.selectConfig(loadConfig);
              });
            //   alert('catch: ' + JSON.stringify(error));
              }
        }
}

function showAll(results){
    console.log('results: ',results);
}
// local notification
//need plugin https://github.com/katzer/cordova-plugin-local-notifications
// cordova plugin add cordova-plugin-local-notification --save
// pass title msg to show local notification
function showNotification(title, msg) {
    notification.schedule({
        title: title,
        text: msg,
        icon: 'http://climberindonesia.com/assets/icon/ionicons-2.0.1/png/512/android-chat.png',
        foreground: true
    });
}


// attaching fast click on body tag
// https://github.com/ftlabs/fastclick
// Sometimes you need FastClick to ignore certain elements. 
// You can do this easily by adding the needsclick class.
// <a class="needsclick">Ignored by FastClick</a>

// https://naver.github.io/egjs/

function loader(){
        $(".se-pre-con").toggle().fadeOut("slow");
}

// localCache
var localCache = {
    remove: function (url) {
        localStorage.removeItem(url);
    },
    exist: function (url) {
        if(localStorage.getItem(url))
            return true;

        return false;
    },
    get: function (url) {
        // console.log('Getting in cache for url' + url);
        return JSON.parse(localStorage.getItem(url)) ;
        
    },
    set: function (url, cachedData, callback) {
        localStorage.setItem(url,JSON.stringify(cachedData));
        if ($.isFunction(callback)) callback(cachedData);
    }
};
function ajaxGet(url,callback){
        $.ajax({
            url: url,
            cache: true,
             type:'GET',
            beforeSend: function () {
                // if (localCache.exist(url)) {
                //     callback(localCache.get(url));
                //     return false;
                // }
                // return true;
            },
            complete: function (data) {
                localCache.set(url, data.responseJSON, callback);
            },
            error:function(){
    // failed request; give feedback to user
    alert('network problem ajax');
  }
        });
   
}

function ajaxPost(url,callback,postData){
     $.ajax({
            url: url,
            cache: true,
             type:'POST',
             data: postData,
            beforeSend: function () {
                if (localCache.exist(url)) {
                    callBack(localCache.get(url));
                    return false;
                }
                return true;
            },
            complete: function (data) {
                localCache.set(url, data, callback);
            },
            error:function(){
    // failed request; give feedback to user
    alert('network problem ajax');
  }
        });
}

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 64) {
        $("#mynavbar").addClass("navbar-fixed");
        $(".nav-wrapper").hide();
    }
    else {
        $("#mynavbar").removeClass("navbar-fixed");
        $(".nav-wrapper").show(); 
    }
});

$(window).on('load', function () {
    // Animate loader off screen
    loader();
});
$(document).ready(function(){
    var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('ul.tabs').tabs();
});

function search(){
    $('.nav-extended').addClass('showSearch');
    $('#search').focus();
}
function searchOff() {
    $('.nav-extended').removeClass('showSearch');
}