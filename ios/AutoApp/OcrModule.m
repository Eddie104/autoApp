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

//RCT_EXPORT_METHOD(upload:(NSString *)uri imaName:(NSString *)imaName token:(NSString *)token successCallback:(RCTResponseSenderBlock)successCallback)
//{
//  QNUploadOption *opt = [[QNUploadOption alloc] initWithMime:nil progressHandler:^(NSString *key, float percent) {
//    NSLog(@"progress %f", percent);
//  }params:nil checkCrc:nil cancellationSignal:nil];
//  QNUploadManager *upManager=[[QNUploadManager alloc]init];
//  NSData *data=[NSData dataWithContentsOfFile:uri];
//  [upManager putData:data key:imaName token:token complete:^(QNResponseInfo *info, NSString *key, NSDictionary *resp) {
//    NSLog(@"%@",info);
//    NSLog(@"七牛的返回信息%@",resp);
//    successCallback(@[resp]);
//  } option: opt];
//}
//

RCT_EXPORT_METHOD(tryToSend:(NSString *)username password:(NSString *)password action:(NSString *)action imgPath:(NSString *)imgPath Callback:(RCTResponseSenderBlock)callback) {
  // NSString *docs2 = [NSHomeDirectory() stringByAppendingPathComponent:imgPath] ;
  // YM_SaveImage(_bImage,(char*)[docs2 UTF8String]);
  
  // NSData* fileData = [NSData dataWithContentsOfFile:imgPath];
  UIImage *img = [UIImage imageWithContentsOfFile:imgPath];
  NSData *imageData=UIImageJPEGRepresentation(img,0.1f);
  self.package = [[PackageAPI alloc]init];
  [_package AFNuploadPackage:imageData UserName:username Passwrod:password Action:action Success:^(NSString *retStr, BOOL isSuccess) {
    if (isSuccess) {
      // [weakSelf recongnitionResult:retStr];
      callback(@[retStr]);
    } else {
//      [weakSelf recongnitionResult:nil];
     callback(@[@"faild"]);
    }
  } Fail:^(NSError *error) {
    callback(@[@"error"]);
  }];
}

@end
