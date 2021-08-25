import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');
const fs = require('fs');
import config from 'src/config/config'

@Injectable()
export class GoogleDriveService {

  CREDENTIAL_RAW_DATA = fs.readFileSync(config.GOOGLE_CREDENTIAL_RAW_DATA);

  async getFilesFromDrive(query, nextPageToken): Promise<any> {
    let credentials = JSON.parse(this.CREDENTIAL_RAW_DATA);

    const client = await google.auth.getClient({
      credentials,
      scopes: config.GOOGLE_SCOPE,
    });

    const drive = await google.drive({ version: 'v3', auth: client, });

    const res = await drive.files.list({
      pageToken: nextPageToken,
      pageSize: 1,
      includeTeamDriveItems: true,
      supportsTeamDrives: true,
      q: query,
      fields: 'nextPageToken, files(id, name, parents)',

    });

    console.log(res);

    if (res){
      let resp = {
        files: res.data.files,
        token: res.data.nextPageToken
      }
      return resp;
    }
      return res.data.files;
  }

  async downloadFileById(fileId) {
    let credentials = JSON.parse(this.CREDENTIAL_RAW_DATA);
    const returnData = [];
    const client = await google.auth.getClient({
      credentials,
      scopes: config.GOOGLE_SCOPE,
    });

    const drive = await google.drive({ version: 'v3', auth: client, });

    var dest = fs.createWriteStream(`${config.GOOGLE_DRIVE_FOLDER}/${fileId}.pdf`);

    await drive.files
      .get({ fileId, alt: 'media' }, { responseType: 'stream' })
      .then(async res => {
        return await new Promise((resolve, reject) => {
          const filePath = `${config.GOOGLE_DRIVE_FOLDER}/${fileId}.pdf`;
          console.log(`writing to ${filePath}`);
          const dest = fs.createWriteStream(filePath);
          let progress = 0;

          res.data
            .on('end', () => {
              console.log('Done downloading file.');
              resolve(filePath);
            })
            .on('error', err => {
              console.error('Error downloading file.');
              reject(err);
            })

            .on('data',async d => {
              progress += d.length;
              if (process.stdout.isTTY) {
                process.stdout.cursorTo(0);
                process.stdout.write(`Downloaded ${progress} bytes`);
              }
            })
            .pipe(dest);
        });
      });

    returnData['ID'] = fileId;
    return returnData;
  }

}
