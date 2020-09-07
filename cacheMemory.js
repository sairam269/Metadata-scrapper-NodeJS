const NodeCache = require( "node-cache" );
const metadataCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

exports.setCacheMetadata=(key,value)=>{
    metadataCache.set( key,value, 10000 );
    //console.log("chached");
    //console.log(metadataCache.data);
}

exports.getCachedMetadata=(key)=>{
    var value = metadataCache.get(key);
    return value;
}

exports.checkChache=(key)=>{
    var value = metadataCache.get(key);
    if ( value == undefined ){
        return 0;
    }else{
        return 1;
    }
}