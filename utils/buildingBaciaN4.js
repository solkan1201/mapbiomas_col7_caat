var path_exp ='projects/mapbiomas-workspace/AMOSTRAS/col7/CAATINGA/joins/'
var asset_bacias = 'projects/mapbiomas-arida/ALERTAS/auxiliar/bacias_hidrografica_caatinga';
var baciasN2 = ee.FeatureCollection(asset_bacias);

var listaNameBacias = [
    '741','7421','7422','744','745','746','7492','751','752','753',
    '754','755','756','757','758','759','7621','7622','763','764',
    '765','766','767','771','772','773', '7741','7742','775','776',
    '777','778','76111','76116','7612','7613','7614','7615','7616',
    '7617','7618','7619'
]


var folderFeatBacias = ee.List([]);

listaNameBacias.forEach(function(nameBacia){
    var asset_group = path_exp + 'grupo_' + nameBacia;
    var feat_bacias  = ee.FeatureCollection(asset_group);
    var geom_baciaN2 = baciasN2.filter(ee.Filter.eq('nunivotto3', nameBacia)).geometry();
    geom_baciaN2 = geom_baciaN2.buffer(-2000);
    feat_bacias = feat_bacias.filterBounds(geom_baciaN2);
    folderFeatBacias = folderFeatBacias.add(feat_bacias);
})

folderFeatBacias = ee.FeatureCollection(folderFeatBacias).flatten();

print("all feat", folderFeatBacias.limit(2))
// folderFeatBacias = folderFeatBacias.distinct(['fid','wts_cd_p_1'])
print(folderFeatBacias.size())

var exportFeat = function(featCol, name){
                        var path_exp = 'projects/mapbiomas-workspace/AMOSTRAS/col7/CAATINGA/';
                        var pmtos = {
                          collection: featCol,
                          description: name,
                          assetId: path_exp + name
                        }
                        Export.table.toAsset(pmtos);
                    };
exportFeat(folderFeatBacias,'bacias_hidrografica_caatingaN4good')