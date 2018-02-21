import fetch from 'node-fetch';
import {parseString} from 'xml2js'


/**
 * A toy, non-production ready function that reads AWS Status RSS feed and 
 * outputs the result to cloudwatch logs
 */
export async function handler(event, context) {
    const rssResp = await fetch('http://status.aws.amazon.com/rss/all.rss');
    const rssXml = await rssResp.text();

    const parsedXml = await parseStringPromise(rssXml);
    const items = parsedXml.rss.channel[0].item;

    const descriptions = items.map(i => `${i.pubDate[0]} - ${i.description[0]}`)
    console.log(JSON.stringify(descriptions, null, 4));
}

/** 
 * Defines at least minimal parsed rss structure
*/
interface AwsStatusFeed {
    rss: {
        channel: ChannelEntity[]
    }
}

interface ChannelEntity {
    item: ItemEntity[]
}

interface ItemEntity {
    pubDate: string[]
    description: string[]
}
/**
 * Primisifies parseString
 * @param xmlString 
 */
function parseStringPromise(xmlString): Promise<AwsStatusFeed> {
    return new Promise((resolve, reject) => {
        parseString(xmlString, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    });
}

