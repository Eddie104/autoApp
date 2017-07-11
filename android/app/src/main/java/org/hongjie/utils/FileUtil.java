package org.hongjie.utils;

import android.app.Activity;
import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

/**
 * Created by hongjie on 2017/7/10.
 */

public class FileUtil {

    public static String newImageName(){
        String uuidStr = UUID.randomUUID().toString();
        return uuidStr.replaceAll("-", "") + ".jpg";
    }

    /**
      * Try to return the absolute file path from the given Uri
      *
      * @param context
      * @param uri
      * @return the file path or null
      */
    public static String getRealFilePath(Activity activity, final Uri uri) {
        if (null == uri) return null;
        final String scheme = uri.getScheme();
        String data = null;
        if (scheme == null) {
            data = uri.getPath();
        } else if (ContentResolver.SCHEME_FILE.equals(scheme)) {
            data = uri.getPath();
        } else if (ContentResolver.SCHEME_CONTENT.equals(scheme)) {
            Cursor cursor = activity.getContentResolver().query(uri, new String[]{MediaStore.Images.ImageColumns.DATA}, null, null, null);
            if (null != cursor) {
                if (cursor.moveToFirst()) {
                    int index = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
                    if (index > -1) {
                        data = cursor.getString(index);
                    }
                }
                cursor.close();
            }
        }
        return data;
    }

    @SuppressWarnings("resource")
    public static byte[] getByteFromPath(String filePath) {
        byte[] bytes = null;
        try {
            File file = new File(filePath);
            if (file.length() > Integer.MAX_VALUE) {
                throw new IOException("File is to large :" + file.getName());
            }
            if (file.exists()) {
                int offset = 0;
                int numRead = 0;
                InputStream is = new FileInputStream(file);
                bytes = new byte[(int) file.length()];
                while (offset < bytes.length &&
                        (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0) {
                    offset += numRead;
                }
                if (offset < bytes.length) {
                    throw new IOException("Could not completely read file "
                            + file.getName());
                }
                is.close();
                return bytes;
            }
        } catch(Exception e) {
            e.printStackTrace();
            bytes = null;
        } finally{
            bytes = null;
        }

        return null;
    }
}
