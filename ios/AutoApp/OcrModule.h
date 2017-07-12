//
//  OcrModule.h
//  AutoApp
//
//  Created by user on 2017/7/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "PackageAPI.h"

@interface OcrModule : NSObject <RCTBridgeModule>
@property (nonatomic, retain)   PackageAPI *package;
@end
