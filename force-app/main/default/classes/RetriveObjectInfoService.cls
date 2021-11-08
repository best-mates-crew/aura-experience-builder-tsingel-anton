public with sharing class RetriveObjectInfoService {
    @AuraEnabled(cacheable=true)
    public void getObjectInfo() {
        List<string> SObjectList = new List<string>();
        for (Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()) {
            String name = objTyp.getDescribe().getName();
            SobjectList.add(name);
            System.debug('Name : ' + name);
			System.debug('Sobject List:' + SobjectList);
        }
    }

	@AuraEnabled(cacheable=true)
    public List<SelectOption> getObjectNames() {
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        List<SelectOption> objNames = new List<SelectOption>();
        List<String> entities = new List<String>(schemaMap.keySet());
        entities.sort();
        for (String name : entities) {
            objNames.add(new SelectOption(name, name));
        }
        return objNames;
    }

 	@AuraEnabled(cacheable=true)
    public static List<String> getContactFields() {
        SObjectType contactType = Schema.getGlobalDescribe().get('Contact');
        Map<String, Schema.SObjectField> mfields = contactType.getDescribe().fields.getMap();

        List<String> sObjectDetailsList = new List<String>();
        for (String s : mfields.keySet()) {
            sObjectDetailsList.add(String.valueOf(mfields.get(s)));
        }
        return sObjectDetailsList;
    }
}