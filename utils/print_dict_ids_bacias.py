#!/usr/bin/env python2
# -*- coding: utf-8 -*-

'''
#SCRIPT DE CLASSIFICACAO POR BACIA
#Produzido por Geodatin - Dados e Geoinformacao
#DISTRIBUIDO COM GPLv2
'''
import ee 
import gee
import sys
import collections
collections.Callable = collections.abc.Callable
try:
    ee.Initialize()
    print('The Earth Engine package initialized successfully!')
except ee.EEException as e:
    print('The Earth Engine package failed to initialize!')
except:
    print("Unexpected error:", sys.exc_info()[0])
    raise


asset_baciasN4 = 'projects/mapbiomas-workspace/AMOSTRAS/col7/CAATINGA/bacias_hidrografica_caatingaN4good'
baciasN4 = ee.FeatureCollection(asset_baciasN4)

lst_ids = baciasN4.reduceColumns(ee.Reducer.toList(2), ['nunivotto3','fid']).get('list').getInfo()

dict_ids = {}
lst_tmp = []
for par in lst_ids:
    # print(par)
    idB2 = par[0]
    idB4 = par[1]
    keylst = [kk for kk in dict_ids.keys()]

    if idB2 not in keylst:
        dict_ids[idB2] = [idB4]
    
    else:
        lst_tmp = dict_ids[idB2]
        lst_tmp.append(idB4)
        dict_ids[idB2] = lst_tmp


lst_idsunique = []
lst_par = []
for kkey, lst in dict_ids.items():
    # print(kkey, lst)
    textk = '"' + kkey + '" :  '    
    print(textk, lst)

    for elem in lst:
        if elem not in lst_idsunique:
            lst_idsunique.append(elem)
        else:
            lst_par.append([kkey,elem])


print('PARES REPETIDOS ')
for par in lst_par:
  print(par)



