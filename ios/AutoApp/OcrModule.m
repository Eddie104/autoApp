//
//  OcrModule.m
//  AutoApp
//
//  Created by user on 2017/7/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "OcrModule.h"

@implementation OcrModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(tryToSend:(NSString *)username password:(NSString *)password action:(NSString *)action imgPath:(NSString *)imgPath Callback:(RCTResponseSenderBlock)callback) {
  UIImage *img = [UIImage imageWithContentsOfFile:imgPath];
  NSData *imageData=UIImageJPEGRepresentation(img,0.1f);
  self.package = [[PackageAPI alloc]init];
  [_package AFNuploadPackage:imageData UserName:username Passwrod:password Action:action Success:^(NSString *retStr, BOOL isSuccess) {
    if (isSuccess) {
      callback(@[@{@"data": retStr}]);
    } else {
      callback(@[@{@"data": @"failed"}]);
    }
  } Fail:^(NSError *error) {
    callback(@[@{@"data": @"error"}]);
  }];
}

@end
