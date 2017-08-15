//
//  FileModule.m
//  AutoApp
//
//  Created by user on 2017/8/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "FileModule.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import <UIKit/UIKit.h>

@implementation FileModule

RCT_EXPORT_MODULE();

//RCT_EXPORT_METHOD(uri2Path:(NSString *)uri Callback:(RCTResponseSenderBlock)callback) {
////  UIImage *img = [UIImage imageWithContentsOfFile:imgPath];
////  NSData *imageData = UIImageJPEGRepresentation(img, 0.1f);
////  self.package = [[PackageAPI alloc]init];
////  [_package AFNuploadPackage:imageData UserName:username Passwrod:password Action:action Success:^(NSString *retStr, BOOL isSuccess) {
////    if (isSuccess) {
////      callback(@[@{@"data": retStr}]);
////    } else {
////      callback(@[@{@"data": @"failed"}]);
////    }
////  } Fail:^(NSError *error) {
////    callback(@[@{@"data": @"error"}]);
////  }];
//   //NSURL *newurl=[NSURL URLWithString:uri];
////  NSString *localPath = [localURL filePathURL];
////  NSURL *url = [[NSURL alloc] initWithString:uri];
////  NSURL *url = [NSURL fileURLWithPath:uri];
//  NSURL *url = [[NSURL alloc] initWithString:uri];
//  callback(@[@{@"path": url.parameterString}]);
//}

RCT_EXPORT_METHOD(readImage:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  
  // Create NSURL from uri
  NSURL *url = [[NSURL alloc] initWithString:input];
  
  // Create an ALAssetsLibrary instance. This provides access to the
  // videos and photos that are under the control of the Photos application.
  ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
  
  // Using the ALAssetsLibrary instance and our NSURL object open the image.
  [library assetForURL:url resultBlock:^(ALAsset *asset) {
    
    // Create an ALAssetRepresentation object using our asset
    // and turn it into a bitmap using the CGImageRef opaque type.
    CGImageRef imageRef = [asset thumbnail];
    // Create UIImageJPEGRepresentation from CGImageRef
    NSData *imageData = UIImageJPEGRepresentation([UIImage imageWithCGImage:imageRef], 0.1);
    
    // Convert to base64 encoded string
    NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];
    
    callback(@[base64Encoded]);
    
  } failureBlock:^(NSError *error) {
    NSLog(@"that didn't work %@", error);
  }];
}

@end
