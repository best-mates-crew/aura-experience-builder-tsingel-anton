public with sharing class FetchPicklistOptionsController {
    @AuraEnabled
    public static List < String > getselectOptions(sObject objName, string field) {
    system.debug('objName --->' + objName);
    system.debug('field --->' + field);
    List <String> allOptions = new list < String > ();

    Schema.sObjectType objType = objName.getSObjectType();

    Schema.DescribeSObjectResult objDescribe = objType.getDescribe();

    Map <String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();

    List <Schema.PicklistEntry> values = fieldMap.get(field).getDescribe().getPickListValues();

    for (Schema.PicklistEntry a: values) {
        allOptions.add(a.getValue());
    }

    system.debug('allOptions ---->' + allOptions);
    allOptions.sort();
    return allOptions;
    }
}