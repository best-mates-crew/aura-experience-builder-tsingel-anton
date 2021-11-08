public with sharing class ObjectInfoRetrieve {
    @AuraEnabled(cacheable=true)
    public static List<ReturnValue> getSObjects() {
        List<ReturnValue> listObjectsInfo = new List<ReturnValue>();
        for (SObjectType objectType : Schema.getGlobalDescribe().values()) {
            DescribeSObjectResult sObjectDescribe = objectType.getDescribe();
            if (sObjectDescribe.isAccessible() && sObjectDescribe.isQueryable()) {
                listObjectsInfo.add(
                    new ReturnValue(sObjectDescribe.getName(), sObjectDescribe.getLabel())
                );
            }
        }
        return listObjectsInfo;
    }

    public class ReturnValue {
        @AuraEnabled
        public String label { get; set; }
        @AuraEnabled
        public String value { get; set; }

        ReturnValue(String v, String l) {
            this.value = v;
            this.label = l;
        }
    }
}