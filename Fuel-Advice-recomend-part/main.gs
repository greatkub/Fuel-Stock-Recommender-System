
function timerDelete() {
  var base_url = "https://tls-fsrs-api.herokuapp.com/FSRS-tank-data/"
  var options = {
    "method": "GET"
  }

  var result = UrlFetchApp.fetch(base_url, options)
  var data = JSON.parse(result)
  var reverse_result = data.reverse()
  Logger.log(JSON.stringify(reverse_result, null, 4))

  var options = {
    "method": "DELETE"
  }

  var base_url = "https://tls-fsrs-api.herokuapp.com/FSRS-tank-data/"
  a = reverse_result[0].date.split(" ")
  if (a[1][0] != "8") {
    Logger.log(reverse_result[0]._id)
    Logger.log(UrlFetchApp.fetch(base_url + reverse_result[0]._id, options))
  }
  b = reverse_result[1].date.split(" ")
  console.log(a[0])
  console.log(b[0])

  console.log(a[1][0])
  console.log(b[1][0])

  if (a[1][0] == "8" && b[1][0] == "8") {
    if (a[0] == b[0]) {
      Logger.log(reverse_result[0]._id)
      Logger.log(UrlFetchApp.fetch(base_url + reverse_result[0]._id, options))
    }

    // Logger.log(UrlFetchApp.fetch(base_url + reverse_result[0]._id, options))
  }


}



function findDelete(data) { //find which one need to delete
  var base_url = "https://tls-fsrs-api.herokuapp.com/FSRS-tank-data/"
  var arrWillBeDeleted = []
  var arr8oClock = []
  var curDate = Utilities.formatDate(new Date(), "GMT+7", "d/M/yyyy")
  // var curDate = "3/10/2022"
  const z = {
    time8Duplicate: arr8oClock,
    deleteNot8oClock: arrWillBeDeleted
  }

  for (var i = 0; i < data.length; i++) {
    var a = data[i].date.split(" ")
    // Logger.log(a[i])
    if (a[0] == curDate) {
      if (a[1][0] == "8") {
        arr8oClock.push(base_url + data[i]._id)
      } else {
        arrWillBeDeleted.push(base_url + data[i]._id)
      }
    } else {
      return z
    }
  }
  return z
}

function getAPI() {
  var URL_STRING = "https://tls-fsrs-api.herokuapp.com/FSRS-tank-data"
  var response = UrlFetchApp.fetch(URL_STRING)
  var json = response.getContentText()
  var data = JSON.parse(json)
  var allTank = data[65].Tank
  // Logger.log(JSON.stringify(data[65].Tank, null, 4))

  // getaaaa(allTank)
  var arr = []

  for (var i = 0; i < tank.length; i++) {
    var tankName = tank[i].TankName
    var volume = parseInt(tank[i].Volume)
    var ullage = parseInt(tank[i].Ullage)
    var maxvolume = parseInt((((volume + ullage) * 90) / 100))
    var color = "#666666"
    var bgColor = ""
    var percentage = (volume * 100) / maxvolume

    if (percentage <= 30) {
      color = "#DE5658"
      bgColor = "#FAD2A76E"
    } else {
      color = "#0D8186"
      bgColor = "#9FD8E36E"
    }



    var showcon2 = {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": tankName,
              "color": "#666666",
              "size": "sm",
              "flex": 2
            },
            {
              "type": "text",
              "text": "(" + volume + " / " + maxvolume + ")",
              "color": "#666666",
              "size": "xxs",
              "flex": 1,
              "weight": "regular",
              "decoration": "none"
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [],
                  "width": percentage + "%",
                  "height": "6px",
                  "backgroundColor": color,
                  "cornerRadius": "xxl"
                }
              ],
              "height": "6px",
              "backgroundColor": bgColor,
              "flex": 5,
              "cornerRadius": "xxl"
            }
          ]
        }
      ],
      "paddingBottom": "sm"
    }
    arr.push(showcon2)

  }

  // Logger.log(JSON.stringify(arr, null, 4))
  return arr
}

function getaaaa(tank) {
  var arr = []
  // var tankName = ""
  // var volume = 0
  // var ullage = 0
  // "TankName": "T 1: GASOHOL 95 PLUS",
  //       "Volume": "2937",
  //       "Ullage": "12438",
  // #DE5658 
  // #FAD2A76E
  for (var i = 0; i < tank.length; i++) {
    var tankName = tank[i].TankName
    var volume = parseInt(tank[i].Volume)
    var ullage = parseInt(tank[i].Ullage)
    var maxvolume = parseInt((((volume + ullage) * 90) / 100))
    var color = "#666666"
    var bgColor = ""
    var percentage = (volume * 100) / maxvolume

    if (percentage <= 30) {
      color = "#DE5658"
      bgColor = "#FAD2A76E"
    } else {
      color = "#0D8186"
      bgColor = "#9FD8E36E"
    }



    var showcon2 = {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": tankName,
              "color": "#666666",
              "size": "sm",
              "flex": 2
            },
            {
              "type": "text",
              "text": "(" + volume + " / " + maxvolume + ")",
              "color": "#666666",
              "size": "xxs",
              "flex": 1,
              "weight": "regular",
              "decoration": "none"
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [],
                  "width": percentage + "%",
                  "height": "6px",
                  "backgroundColor": color,
                  "cornerRadius": "xxl"
                }
              ],
              "height": "6px",
              "backgroundColor": bgColor,
              "flex": 5,
              "cornerRadius": "xxl"
            }
          ]
        }
      ],
      "paddingBottom": "sm"
    }



    arr.push(showcon2)

  }

  // Logger.log(JSON.stringify(arr, null, 4))
  return arr
}

var i = 0


function doPost(e) {
  // var ss = SpreadsheetApp.openById("1Go8RU5GaHiTVI4odbEa1Jx-y1Fhz7yc-B0sya_5B5vM");//แก้ไข
  // var sheet = ss.getSheetByName("sheet1");//แก้ไข
  var requestJSON = e.postData.contents;
  var requestObj = JSON.parse(requestJSON).events[0];
  var token = requestObj.replyToken;
  var userId = requestObj.source.userId;

  // if (requestObj.type === "follow") {
  //   var userId = requestObj.source.userId;
  //   var userProfiles = getUserProfiles(userId);

  //   var lastRow = sheet.getLastRow();
  //   sheet.getRange(lastRow + 1, 1).setValue(userId);
  //   sheet.getRange(lastRow + 1, 2).setValue(userProfiles[0]);
  //   sheet.getRange(lastRow + 1, 3).setValue(userProfiles[1]);
  //   sheet.getRange(lastRow + 1, 4).setFormula("=image(C" + (lastRow + 1) + ")");

  //   var replyText = "สวัสดีคุณ "+ userProfiles[0] + ", ยินดีต้อนรับเข้าสู่การใช้งานบอตนะครับ!!!";//แก้ไข
  //   return replyMessage(token, replyText);
  // }

  // if(userId == "Ueb1d169e8c3af5a0418dd0fb5d963b76") {
  var userMessage = requestObj.message.text;
  var replyText = userMessage;

  if(userId == "U01dfaf89340fac373d0cfd2c06e45a3c") {
     return replyMessage(token, replyText);
  } else {
     replyText = "Contract lineBot developer to give the access for your userId. \nYour userId is " + userId;
     return replyMessage2(token, replyText);
  }

  // }


}

function replyMessage2(token, replyText) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer pVgGVeW6x7m2RZ8b7wSUELDDpp4kE+Bz86ohpqKbQx+KMEnBnFnjlwD8qk68Qr0Ldls/4zrKyDVgJt/QZVsMO1eo2ymgNbRGCFp4IGpmBsPi8y5w1pNwTNlY3m5eI0FkRbGSFvHJIDrd01RWNJgv4AdB04t89/1O/w1cDnyilFU=" //แก้ไข
  };


  var postData = {
    "replyToken" : token,
    "messages" : [{
      "type" : "text",
      "text" : replyText
    }]
  };

  var options = {
    "method" : "POST",
    "headers" : lineHeader,
    "payload" : JSON.stringify(postData)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
  }
  
  catch (error) {
    Logger.log(error.name + "：" + error.message);
    return;
  }

  if (response.getResponseCode() === 200) {
    Logger.log("Sending message completed.");
  }


}

function replyMessage(token, replyText) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer pVgGVeW6x7m2RZ8b7wSUELDDpp4kE+Bz86ohpqKbQx+KMEnBnFnjlwD8qk68Qr0Ldls/4zrKyDVgJt/QZVsMO1eo2ymgNbRGCFp4IGpmBsPi8y5w1pNwTNlY3m5eI0FkRbGSFvHJIDrd01RWNJgv4AdB04t89/1O/w1cDnyilFU=" //แก้ไข
  };

  //  #Best Seller
  //                   #Most Sold Out

  if (replyText.indexOf("#") != -1) {

    if (replyText == "#Best Seller") {
      var postData = {
        "replyToken": token,
        "messages": [
          bestSeller(),

          beQuickReply()
          // outOfTank(),
          // recomendationSystem()
        ]
      }
    }
    else if (replyText == "#Most Sold Out") {
      var postData = {
        "replyToken": token,
        "messages": [
          // bestSeller(),
          outOfTank(),

          beQuickReply()
          // recomendationSystem()
        ]
      }
    }
    else if (replyText == "#Suggestion") {
      var postData = {
        "replyToken": token,
        "messages": [
          // bestSeller(),
          // outOfTank()
          recomendationSystem()
          ,

          beQuickReply()
        ]
      }
    }
    else if (replyText == "#FuelVolume") {
      var postData = {
        "replyToken": token,
        "messages": [
          // showDetail()
          // getAPI()
          //Second message
          showconnnnn()
          ,

          beQuickReply()

        ]
      }
    }


  } else {
    var postData = {
      "replyToken": token,
      "messages": [
        // showDetail()
        // getAPI()
        //Second message
        // showconnnnn()

        //         ,

        // beQuickReply()

        beQuickReply()


      ]
    }
  }

  var options = {
    "method": "POST",
    "headers": lineHeader,
    "payload": JSON.stringify(postData)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
  }

  catch (error) {
    Logger.log(error.name + "：" + error.message);
    errmessage = error.name + "：" + error.message
    i = 1
    replyMessage(token, errmessage)
    return;
  }

  if (response.getResponseCode() === 200) {
    Logger.log("Sending message completed.");
  }
}

function outOfTank() {
  moft = testabc()

  Logger.log("hello")
  Logger.log(JSON.stringify(moft, null, 4))
  Logger.log("hello")

  var outTank = {
    "type": "flex",
    "altText": "This is a Flex Message",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "Most Out of Tanks",
            "weight": "bold",
            "color": "#DE5658",
            "size": "sm"
          },
          {
            "type": "text",
            "text": "The One Petroleum",
            "weight": "bold",
            "size": "lg",
            "margin": "md"
          },
          {
            "type": "text",
            "text": "(at " + Utilities.formatDate(new Date(), "GMT+7", "d/M/yyyy") + ")",
            "size": "xs",
            "color": "#aaaaaa",
            "wrap": true
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "xxl",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": moft[0].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": Math.round(moft[0].timeLeft)
                      + " days",
                    "size": "sm",
                    "color": "#555555",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": moft[1].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": Math.round(moft[1].timeLeft)
                      + " days",
                    "size": "sm",
                    "color": "#555555",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": moft[2].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": Math.round(moft[2].timeLeft)
                      + " days",
                    "size": "sm",
                    "color": "#555555",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": moft[3].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": Math.round(moft[3].timeLeft)
                      + " days",
                    "size": "sm",
                    "color": "#555555",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": moft[4].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": Math.round(moft[4].timeLeft)
                      + " days",
                    "size": "sm",
                    "color": "#555555",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": moft[5].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": Math.round(moft[5].timeLeft)
                      + " days",
                    "size": "sm",
                    "color": "#555555",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": moft[6].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": Math.round(moft[6].timeLeft)
                      + " days",
                    "size": "sm",
                    "color": "#555555",
                    "align": "end"
                  }
                ]
              }
            ]
          }
        ]
      },
      "styles": {
        "footer": {
          "separator": true
        }
      }
    }
  }
  return outTank
}
function showDetail() {
  var stationDetail = {
    "type": "flex",
    "altText": "This is a Flex Message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://i.ibb.co/VTbqNrV/the-One-Photo.png",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": "http://linecorp.com/"
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "The One Petroleum",
            "weight": "bold",
            "size": "lg"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "T 1: GASOHOL 95 PLUS",
                        "color": "#666666",
                        "size": "sm",
                        "flex": 2
                      },
                      {
                        "type": "text",
                        "text": "(1956 / 13419)",
                        "color": "#666666",
                        "size": "xxs",
                        "flex": 1,
                        "weight": "regular",
                        "decoration": "none"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "70%",
                            "height": "6px",
                            "backgroundColor": "#0D8186",
                            "cornerRadius": "xxl"
                          }
                        ],
                        "height": "6px",
                        "backgroundColor": "#9FD8E36E",
                        "flex": 5,
                        "cornerRadius": "xxl"
                      }
                    ]
                  }
                ],
                "paddingBottom": "sm"
              },
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "T 2: GASOHOL 91",
                        "color": "#666666",
                        "size": "sm",
                        "flex": 2
                      },
                      {
                        "type": "text",
                        "text": "(1956 / 13419)",
                        "color": "#666666",
                        "size": "xxs",
                        "flex": 1,
                        "weight": "regular"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "20%",
                            "height": "6px",
                            "backgroundColor": "#DE5658",
                            "cornerRadius": "xxl"
                          }
                        ],
                        "height": "6px",
                        "backgroundColor": "#FAD2A76E",
                        "flex": 5,
                        "cornerRadius": "xxl"
                      }
                    ]
                  }
                ],
                "paddingBottom": "sm"
              },
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "T 3: E20",
                        "color": "#666666",
                        "size": "sm",
                        "flex": 2
                      },
                      {
                        "type": "text",
                        "text": "(1956 / 13419)",
                        "color": "#666666",
                        "size": "xxs",
                        "flex": 1,
                        "weight": "regular"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "40%",
                            "height": "6px",
                            "backgroundColor": "#0D8186",
                            "cornerRadius": "xxl"
                          }
                        ],
                        "height": "6px",
                        "backgroundColor": "#9FD8E36E",
                        "flex": 5,
                        "cornerRadius": "xxl"
                      }
                    ]
                  }
                ],
                "paddingBottom": "sm"
              },
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "T 4: GASOHOL 95",
                        "color": "#666666",
                        "size": "sm",
                        "flex": 2
                      },
                      {
                        "type": "text",
                        "text": "(1956 / 13419)",
                        "color": "#666666",
                        "size": "xxs",
                        "flex": 1,
                        "weight": "regular"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "70%",
                            "height": "6px",
                            "backgroundColor": "#0D8186",
                            "cornerRadius": "xxl"
                          }
                        ],
                        "height": "6px",
                        "backgroundColor": "#9FD8E36E",
                        "flex": 5,
                        "cornerRadius": "xxl"
                      }
                    ]
                  }
                ],
                "paddingBottom": "sm"
              },
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "T 5: SUPREME+DIESEL",
                        "color": "#666666",
                        "size": "sm",
                        "flex": 2
                      },
                      {
                        "type": "text",
                        "text": "(1956 / 13419)",
                        "color": "#666666",
                        "size": "xxs",
                        "flex": 1,
                        "weight": "regular"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "30%",
                            "height": "6px",
                            "backgroundColor": "#0D8186",
                            "cornerRadius": "xxl"
                          }
                        ],
                        "height": "6px",
                        "backgroundColor": "#9FD8E36E",
                        "flex": 5,
                        "cornerRadius": "xxl"
                      }
                    ]
                  }
                ],
                "paddingBottom": "sm"
              },
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "T 6: Diesel",
                        "color": "#666666",
                        "size": "sm",
                        "flex": 2
                      },
                      {
                        "type": "text",
                        "text": "(1956 / 13419)",
                        "color": "#666666",
                        "size": "xxs",
                        "flex": 1,
                        "weight": "regular"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "80%",
                            "height": "6px",
                            "backgroundColor": "#0D8186",
                            "cornerRadius": "xxl"
                          }
                        ],
                        "height": "6px",
                        "backgroundColor": "#9FD8E36E",
                        "flex": 5,
                        "cornerRadius": "xxl"
                      }
                    ]
                  }
                ],
                "paddingBottom": "sm"
              },
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "T 7: B7",
                        "color": "#666666",
                        "size": "sm",
                        "flex": 2
                      },
                      {
                        "type": "text",
                        "text": "(1956 / 13419)",
                        "color": "#666666",
                        "size": "xxs",
                        "flex": 1,
                        "weight": "regular"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "50%",
                            "height": "6px",
                            "backgroundColor": "#0D8186",
                            "cornerRadius": "xxl"
                          }
                        ],
                        "height": "6px",
                        "backgroundColor": "#9FD8E36E",
                        "flex": 5,
                        "cornerRadius": "xxl"
                      }
                    ]
                  }
                ],
                "paddingBottom": "sm"
              }
            ]
          }
        ]
      }
    }
  }
  return stationDetail
}

function bestSeller() {

  volumnperday = testabc()


  var topSell = {
    "type": "flex",
    "altText": "This is a Flex Message",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "Best Seller",
            "weight": "bold",
            "color": "#1DB446",
            "size": "sm"
          },
          {
            "type": "text",
            "text": "The One Petroleum",
            "weight": "bold",
            "size": "lg",
            "margin": "md"
          },
          {
            "type": "text",
            "text": "(at " + Utilities.formatDate(new Date(), "GMT+7", "d/M/yyyy") + ")",
            "size": "xs",
            "color": "#aaaaaa",
            "wrap": true
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "xxl",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": volumnperday[0].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "+" + parseInt(volumnperday[0].vol_perDay)
                      + " L",
                    "size": "sm",
                    "color": "#1DB446",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": volumnperday[1].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "+" + parseInt(volumnperday[1].vol_perDay)
                      + " L",
                    "size": "sm",
                    "color": "#1DB446",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": volumnperday[2].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "+" + parseInt(volumnperday[2].vol_perDay)
                      + " L",
                    "size": "sm",
                    "color": "#1DB446",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": volumnperday[3].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "+" + parseInt(volumnperday[3].vol_perDay)
                      + " L",
                    "size": "sm",
                    "color": "#1DB446",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": volumnperday[4].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "+" + parseInt(volumnperday[4].vol_perDay)
                      + " L",
                    "size": "sm",
                    "color": "#1DB446",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": volumnperday[5].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "+" + parseInt(volumnperday[5].vol_perDay)
                      + " L",
                    "size": "sm",
                    "color": "#1DB446",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": volumnperday[6].tank,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "+" + parseInt(volumnperday[6].vol_perDay)
                      + " L",
                    "size": "sm",
                    "color": "#1DB446",
                    "align": "end"
                  }
                ]
              }
            ]
          }
        ]
      },
      "styles": {
        "footer": {
          "separator": true
        }
      }
    }
  }


  return topSell
}

function beQuickReply() {

  var quickMessages = {

    "type": "text",
    "text": "How can i help you?",
    "quickReply": {
      "items": [

        {
          "type": "action",
          "imageUrl": "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/lightbulb-512.png",
          "action": {
            "type": "message",
            "label": "Suggestion",
            "text": "#Suggestion"
          }
        },
        // {
        //   "type": "action",
        //   "imageUrl": "https://cdn0.iconfinder.com/data/icons/winter-lollipop/374/Delivery.png",
        //   "action": {
        //     "type": "uri",
        //     "label": "Total orderd",
        //     "uri": "https://liff.line.me/1657319119-2NnENJaG"
        //   }
        // },
        {
          "type": "action",
          "imageUrl": "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Checkmark-512.png",
          "action": {
            "type": "message",
            "label": "Fuel Volume",
            "text": "#FuelVolume"
          }
        },
        {
          "type": "action",
          "imageUrl": "https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/6-512.png",
          "action": {
            "type": "message",
            "label": "Best Seller",
            "text": "#Best Seller"
          }
        },
        {
          "type": "action",
          "imageUrl": "https://cdn0.iconfinder.com/data/icons/citycons/150/Citycons_fuel-512.png",
          "action": {
            "type": "message",
            "label": "Most Sold Out",
            "text": "#Most Sold Out"
          }
        }
      ]
    }

  }
  return quickMessages
}
showdate = ""
function testabc(timeback) {
  var URL_STRING = "https://tls-fsrs-api.herokuapp.com/FSRS-tank-data"
  var response = UrlFetchApp.fetch(URL_STRING)

  var json = response.getContentText()
  var data = JSON.parse(json)
  var datareverse = data.reverse()
  currentArrtank = []
  tanklist = ['T1:GASOHOL 95 PLUS', 'T2:GASOHOL 91', 'T3:E20', 'T4:GASOHOL 95', 'T5:SUPREME+DIESEL', 'T6:Diesel', 'T7:B7']
  //#001
  dayback = 0
  // dayback = timeback

  //2 = 10/10/22
  //49 = 22/08/22
  showdate = datareverse[0 + dayback].date
  for (t = 0; t < tanklist.length; t++) {
    currentArrtank.push(datareverse[0 + dayback].Tank[t].Volume)
  }
  // var currentArrtank = [datareverse[0+19].Volume, datareverse[0+19].Volume, datareverse[0+19].Volume, datareverse[0+19].Volume]

  eachTankarr = []
  topSold = []
  differ = []
  limitEchTank = [13837, 13666, 13630, 13648, 13853, 13853, 28638]



  for (t = 0; t < tanklist.length; t++) {
    for (i = 0; i < 14; i++) {
      z = datareverse[i + dayback + 1].Tank[t].Volume - datareverse[i + dayback].Tank[t].Volume

      if (z <= 0) {

      } else {
        differ.push(z)
      }
    }
    eachTankarr.push(differ)
    // Logger.log(tanklist[t] + " -> " + differ)
    differ = []
  }

  shouldWeOrder = 0
  for (j = 0; j < eachTankarr.length; j++) {

    bestSell = getSum(eachTankarr[j]) / eachTankarr[j].length
    // deductCurrentTank = (limitEchTank[j] * 10) / 100
    // a = (currentArrtank[j] - deductCurrentTank) /(getSum(eachTankarr[j])/eachTankarr[j].length)
    a = currentArrtank[j] / (getSum(eachTankarr[j]) / eachTankarr[j].length)

    // extra = Math.round((limitEchTank[j] - currentArrtank[j]) / 1000) * 1000
    extra = limitEchTank[j] - currentArrtank[j]
    //extra คือน้ำมันที่เติมได้มากสุดในตอนนี้ โดยปัดเสาแล้ว
    topSold.push({
      'tank': tanklist[j],
      'vol_perDay': bestSell,
      'timeLeft': a,
      // 'maximumcanadd': limitEchTank[j] - currentArrtank[j],

      'maximumcanadd': extra
      //  + (bestSell/2)
      ,

      // 'maximumcanadd': extra + bestSell/2,
      'timeleftIfTankFull': limitEchTank[j] / bestSell,
      'maxTank': limitEchTank[j],
      'percentage': bestSell * 100 / limitEchTank[j],
      // 'posibleTofill': possibleTofillTank(limitEchTank[j] - currentArrtank[j])
    })

    // shouldWeOrder += limitEchTank[j] - currentArrtank[j]
  }
  //#001

  Logger.log(JSON.stringify(topSold, null, 4))
  return topSold;

}

function letloop() {
  // var a = []
  // for(var i = 0; i < 50; i++) {
  //   a.push(recomendationSystem(i))
  // }
  // Logger.log(a)
  // #001
  recomendationSystem(1)

}

function recomendationSystem(timeback) {
  minimum = 22000
  data = testabc(timeback)

  reorderFromVolumnPD = data.sort((x, y) => { return y.vol_perDay - x.vol_perDay })
  reorderFromMostOutofTank = data.sort((x, y) => { return x.timeLeft - y.timeLeft })


  top4mostOutTank = [reorderFromMostOutofTank[0], reorderFromMostOutofTank[1], reorderFromMostOutofTank[2], reorderFromMostOutofTank[3], reorderFromMostOutofTank[4], reorderFromMostOutofTank[5], reorderFromMostOutofTank[6]]

  //OPtion to delete maximum can add that < 4000
  kept = []
  num = 0

  for (var i = 0; i < 7; i++) {
    currentValue = top4mostOutTank[i].maxTank - top4mostOutTank[i].maximumcanadd
    tenPercent = (top4mostOutTank[i].maxTank * 10) / 100
    if (
      top4mostOutTank[i].maximumcanadd >= 4000 &&
      top4mostOutTank[i].timeLeft <= 4
    ) {
      top4mostOutTank[i].maximumcanadd = Math.round(top4mostOutTank[i].maximumcanadd / 1000) * 1000
      kept.push(top4mostOutTank[i])
      num = i
    }


    // else if (top4mostOutTank[i].maximumcanadd >= 4000 && 
    //   currentValue < 2000) {
    //   kept.push(top4mostOutTank[i])
    // }


  }

  for (var i = num; i < 7; i++) {
    currentValue = top4mostOutTank[i].maxTank - top4mostOutTank[i].maximumcanadd

    if (currentValue < 1900) {
      top4mostOutTank[i].maximumcanadd = Math.round(top4mostOutTank[i].maximumcanadd / 1000) * 1000
      kept.push(top4mostOutTank[i])
    }
  }



  top4mostOutTank = kept
  //Option

  // Logger.log(JSON.stringify(top3mostOutTank, null, 4))
  revTop = top4mostOutTank.sort((x, y) => { return y.vol_perDay - x.vol_perDay })
  // revTop[0].maximumcanadd =  revTop[0].maximumcanadd + bestSell/2
  // revTop[1].maximumcanadd =  revTop[1].maximumcanadd + bestSell/3

  //#001

  Logger.log(JSON.stringify(revTop, null, 4))


  // {
  //       "tank": "T7:B7",
  //       "vol_perDay": 6866.857142857143,
  //       "timeLeft": 1.7419905134392943,
  //       "maximumcanadd": 16676,
  //       "timeleftIfTankFull": 4.170466838645252,
  //       "maxTank": 28638,
  //       "percentage": 23.97813095487514
  //   },
  fillup = [-1, -1, -1, -1, -1]
  count = 0
  // text = "no recom"
  //add bonustank 50% only top1 bestseller
  // STEP 1 = 9000 9000 4000

  if (top4mostOutTank.length == 2) {
    // Step 6  18000 4000 > 22000
    if (revTop[0].maximumcanadd >= 18000 && revTop[1].maximumcanadd >= 4000) {
      fillup[0] = 16000
      fillup[1] = 6000
      count = 2
    }
    // Step 7 16000 6000 -> 22000
    else if (revTop[0].maximumcanadd >= 16000 && revTop[1].maximumcanadd >= 6000) {
      fillup[0] = 16000
      fillup[1] = 6000
      count = 2
    }
    // Step 8 13000 9000 -> 22000
    else if (revTop[0].maximumcanadd >= 13000 && revTop[1].maximumcanadd >= 9000) {
      fillup[0] = 13000
      fillup[1] = 9000
      count = 2
    }
  } else if (top4mostOutTank.length == 3) {
    if (revTop[0].maximumcanadd >= 9000 && revTop[1].maximumcanadd >= 9000 && revTop[2].maximumcanadd >= 4000) {
      fillup[0] = 9000
      fillup[1] = 9000
      fillup[2] = 4000
      count = 3

    }
    // STEP 2 = 10000 6000 6000
    else if (revTop[0].maximumcanadd >= 10000 && revTop[1].maximumcanadd >= 6000 && revTop[2].maximumcanadd >= 6000) {
      fillup[0] = 10000
      fillup[1] = 6000
      fillup[2] = 6000
      count = 3

    }
    //Step 4 = 12000 6000 4000 -> 22000

    else if (revTop[0].maximumcanadd >= 13000 && revTop[1].maximumcanadd >= 5000 && revTop[2].maximumcanadd >= 5000) {
      fillup[0] = 12000
      fillup[1] = 6000
      fillup[2] = 4000
      count = 3

    }
    //Step 5 = 13000 5000 5000 -> 23000
    else if (revTop[0].maximumcanadd >= 13000 && revTop[1].maximumcanadd >= 5000 && revTop[2].maximumcanadd >= 5000) {
      fillup[0] = 13000
      fillup[1] = 5000
      fillup[2] = 5000
      count = 3

    }

  } else if (top4mostOutTank.length == 4) {
    // Step 3 = 9000 5000 5000 4000 -> 23000

    if (revTop[0].maximumcanadd >= 9000 && revTop[1].maximumcanadd >= 5000 && revTop[2].maximumcanadd >= 5000 && revTop[3].maximumcanadd >= 4000) {

      fillup[0] = 9000
      fillup[1] = 5000
      fillup[2] = 5000
      fillup[3] = 4000
      count = 4

    }

  } else if (top4mostOutTank.length == 5) {
    // 9000 5000 5000 5000 4000 = 28000
    if (revTop[0].maximumcanadd >= 9000 && revTop[1].maximumcanadd >= 5000 && revTop[2].maximumcanadd >= 5000 && revTop[3].maximumcanadd >= 5000 && revTop[3].maximumcanadd >= 5000) {
      fillup[0] = 9000
      fillup[1] = 5000
      fillup[2] = 5000
      fillup[3] = 5000
      fillup[4] = 4000
      count = 5



      // 9000 9000 6000 6000 4000 = 34000


      // 10000 9000 6000 5000 4000 = 34000
    }
    else if (revTop[0].maximumcanadd >= 9000 && revTop[1].maximumcanadd >= 9000 && revTop[2].maximumcanadd >= 6000 && revTop[3].maximumcanadd >= 6000 && revTop[3].maximumcanadd >= 4000) {
      fillup[0] = 9000
      fillup[1] = 9000
      fillup[2] = 6000
      fillup[3] = 6000
      fillup[4] = 4000
      count = 5


    }
    else if (revTop[0].maximumcanadd >= 10000 && revTop[1].maximumcanadd >= 9000 && revTop[2].maximumcanadd >= 6000 && revTop[3].maximumcanadd >= 5000 && revTop[3].maximumcanadd >= 4000) {
      fillup[0] = 10000
      fillup[1] = 9000
      fillup[2] = 6000
      fillup[3] = 5000
      fillup[4] = 4000
      count = 5


    }
  }

  // Logger.log(showdate)
  text = ""
  for (var i = 0; i < count; i++) {
    text += revTop[i].tank + " " + fillup[i] + "-> " + revTop[i].timeLeft + '\n'
  }

  if (count == 0) {
    text = "no suggestion"
  }
  //#001
  // return(showdate + "\n" + text + "\n\n")
  Logger.log(showdate + "\n" + text + "\n\n")



  return contentItems(revTop, fillup, count)

}

// 1. 22,000
// 2. ห้ามต่ำกว่า 1000 นึง // ไม่สนใจ
// 3. บรรจุ 90% สั่งได้ไม่เกินนี้ จาก100%
// 4. เรียงวันที่ใกล้หมด ออกมาก่อน
// 5. เรียงใหม่อีกครั้ง เรียงลำดัยตามยอดขาย มากไปน้อย
// 6. เติมจากมากไปน้อย ตามลำกับจากข้อ5
// 7. คัดจำนวนแท้งที่ต้องเติม โดยเช็คจากถังที่น้อยกว่า 3 วัน

//[9000-1000] [9000-1000] [5000-6000] [5000-6000] [5000-6000] [5000-6000] [4000]
// 18000 (9000 9000) 4000, 




function contentItems(revTop, fillup, count) {
  contents = []
  if (count != 0) {
    for (i = 0; i < count; i++) {
      insideContent = {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": i + 1 + ". " + revTop[i].tank,
            "size": "sm",
            "color": "#555555",
            "flex": 0
          },
          {
            "type": "text",
            "text": fillup[i] + " L",
            "size": "sm",
            "color": "#1DB446",
            "align": "end"
          }
        ]
      }
      contents.push(insideContent)
    }
    var showRecom = {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Suggestion order",
              "weight": "bold",
              "color": "#1DB446",
              "size": "sm"
            },
            {
              "type": "text",
              "text": "The One Petroleum",
              "weight": "bold",
              "size": "lg",
              "margin": "md"
            },
            {
              "type": "text",
              "text": "(at " + Utilities.formatDate(new Date(), "GMT+7", "d/M/yyyy") + ")",
              "size": "xs",
              "color": "#aaaaaa",
              "wrap": true
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "xxl",
              "spacing": "sm",
              "contents": contents
            }
          ]
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
    }
  } else {
    var showRecom = {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "No recomendation today",
              "weight": "bold",
              "size": "lg",
              "margin": "md"
            }
          ]
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
    }
  }



  return showRecom
}


function getSum(arr) {
  sum = 0
  for (i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}


function showconnnnn() {
  var URL_STRING = "https://tls-fsrs-api.herokuapp.com/FSRS-tank-data"
  var response = UrlFetchApp.fetch(URL_STRING)
  var json = response.getContentText()
  var data = JSON.parse(json)
  var allTank = data[data.length - 1].Tank
  var arr = []
  // Logger.log(JSON.stringify(data[data.length-1], null, 4))

  for (var i = 0; i < allTank.length; i++) {

    var tankName = allTank[i].TankName
    var volume = parseInt(allTank[i].Volume)
    var ullage = parseInt(allTank[i].Ullage)
    var maxvolume = parseInt((((volume + ullage) * 90) / 100))
    var color = "#666666"
    var bgColor = ""
    var percentage = (volume * 100) / maxvolume

    if (percentage <= 30) {
      color = "#DE5658"
      bgColor = "#FAD2A76E"
    } else {
      color = "#0D8186"
      bgColor = "#9FD8E36E"
    }
    var showcon2 = {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": tankName,
              "color": "#666666",
              "size": "sm",
              "flex": 2
            },
            {
              "type": "text",
              "text": "(" + volume + " / " + maxvolume + ")",
              "color": "#666666",
              "size": "xxs",
              "flex": 1,
              "weight": "regular",
              "decoration": "none"
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [],
                  "width": percentage + "%",
                  "height": "6px",
                  "backgroundColor": color,
                  "cornerRadius": "xxl"
                }
              ],
              "height": "6px",
              "backgroundColor": bgColor,
              "flex": 5,
              "cornerRadius": "xxl"
            }
          ]
        }
      ],
      "paddingBottom": "sm"
    }
    arr.push(showcon2)
  }

  var stationDetail = {
    "type": "flex",
    "altText": "This is a Flex Message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://i.ibb.co/VTbqNrV/the-One-Photo.png",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": "http://linecorp.com/"
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "The One Petroleum",
            "weight": "bold",
            "size": "lg"
          },
          {
            "type": "text",
            "text": "(at " + formatTime(data[data.length - 1].date) + ")",
            // "weight": "bold",
            "color": "#666666",
            "size": "xs"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents":
              arr

          }
        ]
      }
    }
  }
  // Logger.log(arr)
  return stationDetail
}


function getUserProfiles(userId) {
  var url = "https://api.line.me/v2/bot/profile/" + userId;
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer pVgGVeW6x7m2RZ8b7wSUELDDpp4kE+Bz86ohpqKbQx+KMEnBnFnjlwD8qk68Qr0Ldls/4zrKyDVgJt/QZVsMO1eo2ymgNbRGCFp4IGpmBsPi8y5w1pNwTNlY3m5eI0FkRbGSFvHJIDrd01RWNJgv4AdB04t89/1O/w1cDnyilFU=" //แก้ไข
  };

  var options = {
    "method": "GET",
    "headers": lineHeader
  };

  var responseJson = UrlFetchApp.fetch(url, options);
  var displayName = JSON.parse(responseJson).displayName;
  var pictureUrl = JSON.parse(responseJson).pictureUrl;

  return [displayName, pictureUrl];
}

function formatTime(x) {
  a = x
  a = a.split(" ")
  Logger.log(a)
  b = a[1].split(":")
  if (b[0].length == 1) {
    b[0] = "0" + b[0]
  }
  if (b[1].length == 1) {
    b[1] += "0"
  }
  z = a[0] + ", " + b[0] + ":" + b[1]
  Logger.log(z)
  return z
}
