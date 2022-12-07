
export const MAINSCOPES = ['patient/Patient.read', 'patient/AllergyIntolerance.read', 'patient/CarePlan.read',
    'patient/CareTeam.read', 'patient/Condition.read', 'patient/DiagnosticReport.read', 'patient/DocumentReference.read',
    'patient/Encounter.read', 'patient/Goal.read', 'patient/Immunization.read', 'patient/Observation.read', 'patient/Medication.read',
    'patient/MedicationRequest.read', 'patient/Procedure.read', 'patient/Coverage.read', 'patient/ExplanationOfBenefit.read', 'patient/Device.read', 
    'patient/Provenance.read'];

export const USER_MAINSCOPES = ['user/Patient.read', 'user/AllergyIntolerance.read', 'user/CarePlan.read',
    'user/CareTeam.read', 'user/Condition.read', 'user/DiagnosticReport.read', 'user/DocumentReference.read',
    'user/Encounter.read', 'user/Goal.read', 'user/Immunization.read', 'user/Observation.read', 'user/Medication.read',
    'user/MedicationRequest.read', 'user/Procedure.read', 'user/Coverage.read', 'user/ExplanationOfBenefit.read', 'user/Device.read', 
    'user/Provenance.read'];

export const DEMOGRAPHICS = [
    {
        scope: "patient/Patient.read",
        about: "App will have access to your demographics & contact info."
    },
]

export const USER_DEMOGRAPHICS = [
    {
        scope: "user/Patient.read",
        about: "User will have access to patients demographics & contact info."
    },
]

export const CLINICAL = [
    {
        scope: "patient/AllergyIntolerance.read",
        about: "App will have access to your allergy or intolerance info."
    },
    {
        scope: "patient/CarePlan.read",
        about: "App will have access to your care plan info."
    },
    {
        scope: "patient/CareTeam.read",
        about: "App will have access to information about people and organizations who plan to participate in the coordination and delivery of care."
    },
    {
        scope: "patient/Condition.read",
        about: "App will have access to your diagnosis/problem info."
    },
    {
        scope: "patient/DiagnosticReport.read",
        about: "App will have access to the findings and interpretation of diagnostic tests performed."
    },
    {
        scope: "patient/DocumentReference.read",
        about: "App will have access to your clinical notes."
    },
    {
        scope: "patient/Encounter.read",
        about: "App will have access to your visits info."
    },
    {
        scope: "patient/Goal.read",
        about: "App will have access to your desired outcome info."
    },
    {
        scope: "patient/Immunization.read",
        about: "App will have access to your current and historical administration of vaccines data."
    },
    {
        scope: "patient/Observation.read",
        about: "App will have access to your vitals, smoking status & lab results."
    },
    {
        scope: "patient/Medication.read",
        about: "App will have access to medication definition which has been prescribed."
    },
    {
        scope: "patient/MedicationRequest.read",
        about: "App will have access to your requested/prescribed medications."
    },
    {
        scope: "patient/Procedure.read",
        about: "App will have access to your current and historical procedures."
    },
    {
        scope: "patient/Device.read",
        about: "App will have access to UDI information associated with implantable device(s)"
    },
]

export const USER_CLINICAL = [
    {
        scope: "user/AllergyIntolerance.read",
        about: "User will have access to patients allergy or intolerance info."
    },
    {
        scope: "user/CarePlan.read",
        about: "User will have access to patients care plan info."
    },
    {
        scope: "user/CareTeam.read",
        about: "User will have access to information about people and organizations who plan to participate in the coordination and delivery of care."
    },
    {
        scope: "user/Condition.read",
        about: "User will have access to patients diagnosis/problem info."
    },
    {
        scope: "user/DiagnosticReport.read",
        about: "User will have access to the findings and interpretation of diagnostic tests performed."
    },
    {
        scope: "user/DocumentReference.read",
        about: "User will have access to patients clinical notes."
    },
    {
        scope: "user/Encounter.read",
        about: "User will have access to patients visits info."
    },
    {
        scope: "user/Goal.read",
        about: "User will have access to patients desired outcome info."
    },
    {
        scope: "user/Immunization.read",
        about: "User will have access to patients current and historical administration of vaccines data."
    },
    {
        scope: "user/Observation.read",
        about: "User will have access to patients vitals, smoking status & lab results."
    },
    {
        scope: "user/Medication.read",
        about: "User will have access to medication definition which has been prescribed."
    },
    {
        scope: "user/MedicationRequest.read",
        about: "User will have access to patients requested/prescribed medications."
    },
    {
        scope: "user/Procedure.read",
        about: "User will have access to patients current and historical procedures."
    },
    {
        scope: "user/Device.read",
        about: "User will have access to UDI information associated with implantable device(s)"
    },
]

export const FINANCIAL = [
    {
        scope: "patient/Coverage.read",
        about: "App will have access to your insurance info."
    },
    {
        scope: "patient/ExplanationOfBenefit.read",
        about: "App will have access to your claim details & adjudication details from the processing of a Claim."
    },
]

export const USER_FINANCIAL = [
    {
        scope: "user/Coverage.read",
        about: "User will have access to patients insurance info."
    },
    {
        scope: "user/ExplanationOfBenefit.read",
        about: "User will have access to patients claim details & adjudication details from the processing of a Claim."
    },
]

export const SECURITY = [
    {
        scope: "patient/Provenance.read",
        about: "App will have access to your source of data."
    }
]

export const USER_SECURITY = [
    {
        scope: "user/Provenance.read",
        about: "App will have access to Patients source of data."
    }
]

export const PATIENTSCOPES = [
    "patient/AllergyIntolerance.read",
    "patient/CarePlan.read",
    "patient/CareTeam.read",
    "patient/Claim.read",
    "patient/ClaimResponse.read",
    "patient/Condition.read",
    "patient/Coverage.read",
    "patient/Device.read",
    "patient/DiagnosticReport.read",
    "patient/DocumentReference.read",
    "patient/Encounter.read",
    "patient/Endpoint.read",
    "patient/ExplanationOfBenefit.read",
    "patient/FamilyMemberHistory.read",
    "patient/Goal.read",
    "patient/Group.read",
    "patient/HealthcareService.read",
    "patient/Immunization.read",
    "patient/InsurancePlan.read",
    "patient/ListResource.read",
    "patient/Location.read",
    "patient/MedicationAdministration.read",
    "patient/MedicationDispense.read",
    "patient/MedicationKnowledge.read",
    "patient/MedicationRequest.read",
    "patient/Medication.read",
    "patient/MedicationStatement.read",
    "patient/Observation.read",
    "patient/OrganizationAffiliation.read",
    "patient/Organization.read",
    "patient/Patient.read",
    "patient/Practitioner.read",
    "patient/PractitionerRole.read",
    "patient/Procedure.read",
    "patient/Provenance.read",
    "patient/RelatedPerson.read",
    "patient/ServiceRequest.read",
    "patient/*.read",
    "fhir_complete",
    "openid",
    "fhirUser",
    "offline_access",
    "online_access"
];

export const USERSCOPES = [
    "user/AllergyIntolerance.read",
    "user/CarePlan.read",
    "user/CareTeam.read",
    "user/Claim.read",
    "user/ClaimResponse.read",
    "user/Condition.read",
    "user/Coverage.read",
    "user/Device.read",
    "user/DiagnosticReport.read",
    "user/DocumentReference.read",
    "user/Encounter.read",
    "user/Endpoint.read",
    "user/ExplanationOfBenefit.read",
    "user/FamilyMemberHistory.read",
    "user/Goal.read",
    "user/Group.read",
    "user/HealthcareService.read",
    "user/Immunization.read",
    "user/InsurancePlan.read",
    "user/ListResource.read",
    "user/Location.read",
    "user/MedicationAdministration.read",
    "user/MedicationDispense.read",
    "user/MedicationKnowledge.read",
    "user/MedicationRequest.read",
    "user/Medication.read",
    "user/MedicationStatement.read",
    "user/Observation.read",
    "user/OrganizationAffiliation.read",
    "user/Organization.read",
    "user/Patient.read",
    "user/Practitioner.read",
    "user/PractitionerRole.read",
    "user/Procedure.read",
    "user/Provenance.read",
    "user/RelatedPerson.read",
    "user/ServiceRequest.read",
    "user/*.read",
    "fhir_complete",
    "openid",
    "fhirUser",
    "offline_access",
    "online_access"
];

export const OTHER = [
    {
        scope: "launch",
        about: "App will have access to your launch info."
    },
    {
        scope: "launch/patient",
        about: "App will have access to your launch/patient info."
    },
    {
        scope: "fhir_complete",
        about: "App will have access to your fhir_complete info."
    },
    {
        scope: "openid",
        about: "App will have access to your openid info."
    },
    {
        scope: "fhirUser",
        about: "App will have access to your fhirUser info."
    },
    {
        scope: "offline_access",
        about: "App will have access to your offline_access info."
    },
    {
        scope: "online_access",
        about: "App will have access to your online_access info."
    },
]

export const USER_OTHER = [
    {
        scope: "launch",
        about: "App will have access to your launch info."
    },
    {
        scope: "launch/patient",
        about: "App will have access to your launch/patient info."
    },
    {
        scope: "fhir_complete",
        about: "App will have access to your fhir_complete info."
    },
    {
        scope: "openid",
        about: "App will have access to your openid info."
    },
    {
        scope: "fhirUser",
        about: "App will have access to your fhirUser info."
    },
    {
        scope: "offline_access",
        about: "App will have access to your offline_access info."
    },
    {
        scope: "online_access",
        about: "App will have access to your online_access info."
    },
]