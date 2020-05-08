class Schoolusers {
  id: number;
  email: string;
  schoolID: number;
  userID: number;
  createdby: string;
  updatedby: string;
}
class SchoolList {
  id: number;
  dispid: string;
  dispid2: string;
  schoolID: string;
  schoolName: string;
  schoolAddress_Lane: string;
  schoolAddress_Area: string;
  schoolAddress_City: string;
  schoolAddress_Pincode: number;
  schoolAddress_State: string;
  schoolAddress_Country: string;
  primary_Contact_Number: number;
  alternate_Contact_Number: number;
  primary_Email_Address: string;
  alternate_Email_Address: string;
  primary_Contact_Person_Name: string;
  primary_Contact_Person_contact_number: number;
  primary_Contact_Person_mobile_number: number;
  primary_Contact_Person_email_address: string;
  alternate_Contact_Person_Name: string;
  alternate_Contact_Person_contact_number: number;
  alternate_Contact_Person_mobile_number: number;
  alternate_Contact_Person_email_address: string;
  created_by: string;
  updated_by: string;
}
class UsersList {
  id: number;
  title: string;
  dispid: string;
  dispid2: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  mobile_number: string;
  address: string;
  email_address: string;
  street: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  created_by: string;
  updated_by: string;
}

/**
 * cynosure Dashboard Graph
 */
class CynosureDashboard_School {
  id: number;
  schoolID: string;
  schoolName: string;
  alternate_Contact_Number: string;
  alternate_Contact_Person_contact_number: string;
  alternate_Contact_Person_mobile_number: string;
}

class CynosureDashboard {
  schoolCount: number;
  schooladminCount: number;
  numberofschoolwithoutuserCount: number;
  numberofuserwithoutschoolCount: number;
  school: CynosureDashboard_School[];
}
