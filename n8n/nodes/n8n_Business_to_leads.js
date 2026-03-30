{
  "nodes": [
    {
      "parameters": {},
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        208,
        112
      ],
      "id": "aba43316-16c3-44ea-be94-0d43e8108216",
      "name": "When clicking ‘Execute workflow’"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "f637603f-d6be-429c-a1e8-6fdfe076f575",
              "name": "website",
              "value": "https://www.asmar.cl/",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        480,
        -304
      ],
      "id": "fae3515c-c2a7-4bf4-a153-d43e63a17233",
      "name": "Edit Fields"
    },
    {
      "parameters": {
        "messages": {
          "message": [
            {
              "content": "=Search for this company and find: {{ $('Edit Fields').item.json.website }}\n\n1. Official website URL\n2. Company domain (e.g., asmar)\n3. Business name (official or commonly used name)\n4. Legal name (if available)\n5. Email addresses\n6. Phone numbers\n7. What the company does (2-3 sentences)\n8. Key information snippets about the company (recent news, achievements, specialties, certifications, etc.)\n\nSet findout to TRUE if you found the website and at least one contact method (email or phone), FALSE otherwise\n\nReturn ONLY this JSON (no markdown, no extra text):\n\n{\n  \"business_name\": \"...\",\n  \"legal_name\": \"...\",\n  \"website_url\": \"...\",\n  \"domain\": \"...\",\n  \"emails\": [...],\n  \"phones\": [...],\n  \"summary\": \"...\",\n  \"snippets\": [\n    \"snippet 1\",\n    \"snippet 2\",\n    \"snippet 3\"\n  ],\n  \"findout\": true\n}"
            }
          ]
        },
        "options": {},
        "requestOptions": {}
      },
      "type": "n8n-nodes-base.perplexity",
      "typeVersion": 1,
      "position": [
        1152,
        -304
      ],
      "id": "e873d437-a8d2-4ea9-bdd0-c7d727c2e802",
      "name": "Message a model",
      "credentials": {
        "perplexityApi": {
          "id": "QEfyhF4Jw5TzaI89",
          "name": "Perplexity Muir Austral"
        }
      }
    },
    {
      "parameters": {
        "pollTimes": {
          "item": [
            {
              "mode": "everyMinute"
            }
          ]
        },
        "documentId": {
          "__rl": true,
          "value": "1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64",
          "mode": "list",
          "cachedResultName": "Muir leads Control point",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 2005423374,
          "mode": "list",
          "cachedResultName": "Raw Data",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit#gid=2005423374"
        },
        "event": "rowAdded",
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheetsTrigger",
      "typeVersion": 1,
      "position": [
        -64,
        -336
      ],
      "id": "5a94fd66-a5f6-4a62-8768-fa639e17a577",
      "name": "Google Sheets Trigger",
      "credentials": {
        "googleSheetsTriggerOAuth2Api": {
          "id": "X5lFjoXdbhhDwj78",
          "name": "Google Sheets Leads Muir"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "0a767983-5249-4770-9c8f-44a3116736c8",
              "leftValue": "={{ $json.findout }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.3,
      "position": [
        1600,
        -304
      ],
      "id": "b5e78cf6-02a4-4397-9434-97428b712e45",
      "name": "If"
    },
    {
      "parameters": {
        "jsCode": "function uuid() {\n  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {\n    const r = Math.random() * 16 | 0;\n    const v = c === 'x' ? r : (r & 0x3 | 0x8);\n    return v.toString(16);\n  });\n}\n\nreturn [\n  {\n    json: {\n      id: uuid()\n    }\n  }\n];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        704,
        -304
      ],
      "id": "c4e9c60f-37ed-481a-a3be-b57979a9ed70",
      "name": "ID Creation"
    },
    {
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": {
          "__rl": true,
          "value": "1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64",
          "mode": "list",
          "cachedResultName": "Muir leads Control point",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 1791939040,
          "mode": "list",
          "cachedResultName": "Not Finded",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit#gid=1791939040"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "phone_1": "={{ $json.phones }}",
            "summary": "={{ $json.summary }}",
            "Snippets": "={{ $json.snippets }}",
            "email_1": "={{ $json.emails }}",
            "website_url": "={{ $json.website_url }}",
            "source": "Internal System",
            "ID": "={{ $('ID Creation').item.json.id }}",
            "company_name": "={{ $('Parser').item.json.domain }}",
            "enriched_date": "={{ new Date().toISOString() }}"
          },
          "matchingColumns": [
            "ID"
          ],
          "schema": [
            {
              "id": "company_name",
              "displayName": "company_name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "source",
              "displayName": "source",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "website_url",
              "displayName": "website_url",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "email_1",
              "displayName": "email_1",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "email_2",
              "displayName": "email_2",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": true
            },
            {
              "id": "email_3",
              "displayName": "email_3",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": true
            },
            {
              "id": "phone_1",
              "displayName": "phone_1",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "phone_2",
              "displayName": "phone_2",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": true
            },
            {
              "id": "phone_3",
              "displayName": "phone_3",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": true
            },
            {
              "id": "summary",
              "displayName": "summary",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "enriched_date",
              "displayName": "enriched_date",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Snippets",
              "displayName": "Snippets",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "ID",
              "displayName": "ID",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.7,
      "position": [
        1824,
        -208
      ],
      "id": "5b171a3d-4b4a-4d5e-ac91-164edfea2496",
      "name": "No find out list",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "yDaZRKvvAxH3woNa",
          "name": "Google Sheets Muir"
        }
      }
    },
    {
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": {
          "__rl": true,
          "value": "1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64",
          "mode": "list",
          "cachedResultName": "Muir leads Control point",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 1560957001,
          "mode": "list",
          "cachedResultName": "Enriched_Leads",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit#gid=1560957001"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "phone_1": "={{ $json.phones }}",
            "summary": "={{ $json.summary }}",
            "Snippets": "={{ $json.snippets }}",
            "email_1": "={{ $json.emails }}",
            "website_url": "={{ $json.website_url }}",
            "source": "Internal System",
            "ID": "={{ $('ID Creation').item.json.id }}",
            "enriched_date": "={{ new Date().toISOString() }}",
            "company_name": "={{ $json.business_name }}",
            "Domain": "={{ $json.domain }}",
            "Legal name ": "={{ $json.legal_name }}"
          },
          "matchingColumns": [
            "ID"
          ],
          "schema": [
            {
              "id": "company_name",
              "displayName": "company_name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "source",
              "displayName": "source",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "website_url",
              "displayName": "website_url",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "email_1",
              "displayName": "email_1",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "phone_1",
              "displayName": "phone_1",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "summary",
              "displayName": "summary",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "enriched_date",
              "displayName": "enriched_date",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Snippets",
              "displayName": "Snippets",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "ID",
              "displayName": "ID",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Domain",
              "displayName": "Domain",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Legal name ",
              "displayName": "Legal name ",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.7,
      "position": [
        1824,
        -400
      ],
      "id": "98c51c74-ef7b-4d2a-ad2a-bc7283dcc67a",
      "name": "Enriched leads List ",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "yDaZRKvvAxH3woNa",
          "name": "Google Sheets Muir"
        }
      }
    },
    {
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": {
          "__rl": true,
          "value": "1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64",
          "mode": "list",
          "cachedResultName": "Muir leads Control point",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 2005423374,
          "mode": "list",
          "cachedResultName": "Raw Data",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit#gid=2005423374"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "ID": "={{ $json.id }}"
          },
          "matchingColumns": [
            "ID"
          ],
          "schema": [
            {
              "id": "company_name",
              "displayName": "company_name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "source",
              "displayName": "source",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "website_url",
              "displayName": "website_url",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "email_1",
              "displayName": "email_1",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "email_2",
              "displayName": "email_2",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "email_3",
              "displayName": "email_3",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "phone_1",
              "displayName": "phone_1",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "phone_2",
              "displayName": "phone_2",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "phone_3",
              "displayName": "phone_3",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "summary",
              "displayName": "summary",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "enriched_date",
              "displayName": "enriched_date",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "ID",
              "displayName": "ID",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.7,
      "position": [
        928,
        -304
      ],
      "id": "a746aff3-ea1d-4c51-b0dd-72b068843064",
      "name": "ID added",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "yDaZRKvvAxH3woNa",
          "name": "Google Sheets Muir"
        }
      }
    },
    {
      "parameters": {
        "operation": "Run actor and get dataset",
        "actorId": {
          "__rl": true,
          "value": "Vb6LZkh4EqRlR0Ka9",
          "mode": "list",
          "cachedResultName": "LinkedIn Company Employees Scraper ✅ No Cookies 📧 (harvestapi/linkedin-company-employees)",
          "cachedResultUrl": "https://console.apify.com/actors/Vb6LZkh4EqRlR0Ka9/input"
        },
        "customBody": "={\n  \"companies\": [\n    \"https://www.linkedin.com/company/{{ $json.company_name }}\"\n  ],\n  \"maxItems\": 20,\n  \"recentlyChangedJobs\": false\n}",
        "timeout": {}
      },
      "type": "@apify/n8n-nodes-apify.apify",
      "typeVersion": 1,
      "position": [
        2048,
        -400
      ],
      "id": "49682c4c-c000-4c43-8a2b-5c11aca8ddf6",
      "name": "Run an Actor and get dataset",
      "credentials": {
        "apifyApi": {
          "id": "hVVmKLRWKouO2fK2",
          "name": "Apify account"
        }
      }
    },
    {
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": {
          "__rl": true,
          "value": "1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64",
          "mode": "list",
          "cachedResultName": "Muir leads Control point",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 1807790394,
          "mode": "list",
          "cachedResultName": "LinkedIn_Contacts",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ohkBGOqclF46nNFUQzlmrJNUj9PHscD8QsdUv72Xt64/edit#gid=1807790394"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "company_name": "={{ $('Parser').item.json.business_name }}",
            "Domain": "={{ $('Enriched leads List ').item.json.Domain }}",
            "Company Website ": "={{ $('Enriched leads List ').item.json.website_url }}",
            "LinkedIn Identifier": "={{ $json.linkedin_identifier }}",
            "job_title": "={{ $json.experiencia_laboral[1].cargo }}",
            "linkedin_url": "={{ $json.linkedin_url }}",
            "person_name": "= {{ $json.nombre_completo }}",
            "biografia": "={{ $json.biografia }}",
            "experiencia laboral": "={{ $json.experiencia_laboral }}",
            "Certificaciones": "={{ $json.educacion }}",
            "influencer?": "={{ $json.influencer }}",
            "Fecha inicio puesto": "={{ $json.fecha_inicio_puesto }}",
            "Seguidores": "={{ $json.seguidores }}",
            "Conexiones": "={{ $json.conexiones }}",
            "ciudad": "={{ $json.ciudad }}",
            "pais codigo": "={{ $json.pais_codigo }}",
            "region": "={{ $json.region }}",
            "pais": "={{ $json.pais_codigo }}",
            "email": "={{ $json.email }}",
            "ID": "={{ $('ID added').item.json.ID }}",
            "Skillss": "={{ $('Run an Actor and get dataset').item.json.experience[0].skills }}"
          },
          "matchingColumns": [
            "Domain"
          ],
          "schema": [
            {
              "id": "company_name",
              "displayName": "company_name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "person_name",
              "displayName": "person_name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "job_title",
              "displayName": "job_title",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "linkedin_url",
              "displayName": "linkedin_url",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "email",
              "displayName": "email",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "phone",
              "displayName": "phone",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "source",
              "displayName": "source",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": true
            },
            {
              "id": "extracted_date",
              "displayName": "extracted_date",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "pais",
              "displayName": "pais",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "ID",
              "displayName": "ID",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "pais codigo",
              "displayName": "pais codigo",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "region",
              "displayName": "region",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "ciudad",
              "displayName": "ciudad",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Conexiones",
              "displayName": "Conexiones",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Seguidores",
              "displayName": "Seguidores",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Fecha inicio puesto",
              "displayName": "Fecha inicio puesto",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "influencer?",
              "displayName": "influencer?",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "biografia",
              "displayName": "biografia",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "experiencia laboral",
              "displayName": "experiencia laboral",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Skillss",
              "displayName": "Skillss",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "lenguajes",
              "displayName": "lenguajes",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Certificaciones",
              "displayName": "Certificaciones",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "proyectos",
              "displayName": "proyectos",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "email ",
              "displayName": "email ",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "LinkedIn Identifier",
              "displayName": "LinkedIn Identifier",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Company Website ",
              "displayName": "Company Website ",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Domain",
              "displayName": "Domain",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.7,
      "position": [
        2720,
        -240
      ],
      "id": "6e3b440a-ad06-4696-91c9-a19e9c72f494",
      "name": "LinkedIn",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "yDaZRKvvAxH3woNa",
          "name": "Google Sheets Muir"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Parsea el output de Perplexity y extrae el JSON limpio\nconst response = $input.first().json.choices[0].message.content;\n\n// Intenta extraer JSON del response (con o sin markdown)\nlet data = null;\n\ntry {\n  // Intenta parsear directamente si es JSON puro\n  data = JSON.parse(response);\n} catch (e) {\n  // Si no funciona, busca JSON entre ``` o {}\n  const jsonMatch = response.match(/\\{[\\s\\S]*\\}/);\n  if (jsonMatch) {\n    try {\n      data = JSON.parse(jsonMatch[0]);\n    } catch (e2) {\n      data = null;\n    }\n  }\n}\n\n// Función para estandarizar domain\nfunction standardizeDomain(domain) {\n  if (!domain) return null;\n  return domain\n    .toLowerCase()\n    .trim()\n    .replace(/[^a-z0-9-]/g, '') // Solo letras, números, guiones\n    .replace(/^www\\./, '') // Elimina www. al inicio\n    .replace(/\\.$/, ''); // Elimina punto final\n}\n\n// Retorna el JSON parseado\nif (data) {\n  const standardizedDomain = standardizeDomain(data.domain);\n  return {\n    business_name: data.business_name || null,\n    legal_name: data.legal_name || null,\n    website_url: data.website_url || null,\n    domain: standardizedDomain,\n    emails: Array.isArray(data.emails) ? data.emails : [],\n    phones: Array.isArray(data.phones) ? data.phones : [],\n    summary: data.summary || '',\n    snippets: Array.isArray(data.snippets) ? data.snippets : [],\n    findout: typeof data.findout === 'boolean' ? data.findout : false\n  };\n} else {\n  return {\n    business_name: null,\n    legal_name: null,\n    website_url: null,\n    domain: null,\n    emails: [],\n    phones: [],\n    summary: '',\n    snippets: [],\n    findout: false,\n    error: 'Could not parse JSON from response'\n  };\n}"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1376,
        -304
      ],
      "id": "c9a9518d-0354-43e2-a919-21b9f4b602e5",
      "name": "Parser"
    },
    {
      "parameters": {
        "jsCode": "// CÓDIGO PARA N8N CODE BLOCK - Extrae toda la información de perfiles LinkedIn\n// Pega esto directamente en un Code Block de N8N\n\nfunction extractEmailFromText(text) {\n  if (!text) return null;\n  const emailPattern = /[\\w\\.-]+@[\\w\\.-]+\\.\\w+/;\n  const match = text.match(emailPattern);\n  return match ? match[0] : null;\n}\n\nfunction extractDateString(dateObj) {\n  if (!dateObj) return null;\n  const year = dateObj.year;\n  const month = dateObj.month;\n  if (year) {\n    if (month) {\n      const monthStr = String(month).padStart(2, '0');\n      return `${year}-${monthStr}`;\n    }\n    return String(year);\n  }\n  return null;\n}\n\nfunction extractProfile(profile) {\n  // IDENTIDAD BÁSICA\n  const firstName = profile.firstName || '';\n  const lastName = profile.lastName || '';\n  const nombreCompleto = `${firstName} ${lastName}`.trim();\n  \n  // CONTACTO\n  const email = extractEmailFromText(profile.about);\n  const locationData = profile.location || {};\n  const parsedLocation = locationData.parsed || {};\n  \n  // EMPRESA ACTUAL\n  const currentPositions = profile.currentPosition || [];\n  let currentCompany = null;\n  let startDateCurrent = null;\n  \n  if (currentPositions.length > 0) {\n    const currentPos = currentPositions[0];\n    currentCompany = currentPos.companyName;\n    const dateRange = currentPos.dateRange || {};\n    startDateCurrent = extractDateString(dateRange.start);\n  }\n  \n  // EXPERIENCIA LABORAL\n  const experienceList = [];\n  const experience = profile.experience || [];\n  for (const exp of experience) {\n    const expEntry = {\n      cargo: exp.position,\n      empresa: exp.companyName,\n      duracion: exp.duration,\n      ubicacion: exp.location,\n      inicio: extractDateString(exp.startDate),\n      fin: exp.endDate ? exp.endDate.text : null,\n      descripcion: exp.description\n    };\n    // Remover valores null\n    const filtered = Object.fromEntries(\n      Object.entries(expEntry).filter(([_, v]) => v !== null && v !== undefined)\n    );\n    if (Object.keys(filtered).length > 0) {\n      experienceList.push(filtered);\n    }\n  }\n  \n  // EDUCACIÓN\n  const educationList = [];\n  const education = profile.education || [];\n  for (const edu of education) {\n    const eduEntry = {\n      institucion: edu.schoolName,\n      titulo: edu.degree,\n      carrera: edu.fieldOfStudy,\n      inicio: extractDateString(edu.startDate),\n      fin: extractDateString(edu.endDate)\n    };\n    const filtered = Object.fromEntries(\n      Object.entries(eduEntry).filter(([_, v]) => v !== null && v !== undefined)\n    );\n    if (Object.keys(filtered).length > 0) {\n      educationList.push(filtered);\n    }\n  }\n  \n  // SKILLS\n  const skillsList = [];\n  const skills = profile.skills || [];\n  for (const skill of skills) {\n    if (skill.name) {\n      skillsList.push({\n        nombre: skill.name,\n        endorsements: skill.endorsements || ''\n      });\n    }\n  }\n  \n  // LENGUAJES\n  const languagesList = [];\n  const languages = profile.languages || [];\n  for (const lang of languages) {\n    if (lang.name) {\n      languagesList.push(lang.name);\n    }\n  }\n  \n  // CERTIFICACIONES\n  const certificationsList = [];\n  const certifications = profile.certifications || [];\n  for (const cert of certifications) {\n    if (cert.name) {\n      certificationsList.push(cert.name);\n    }\n  }\n  \n  // PROYECTOS\n  const projectsList = [];\n  const projects = profile.projects || [];\n  for (const proj of projects) {\n    if (proj.name) {\n      projectsList.push(proj.name);\n    }\n  }\n  \n  // CONSTRUIR PERFIL EXTRAÍDO\n  const extracted = {\n    // IDENTIDAD\n    id: profile.id,\n    nombre_completo: nombreCompleto,\n    nombre: firstName,\n    apellido: lastName,\n    linkedin_url: profile.linkedinUrl,\n    linkedin_identifier: profile.publicIdentifier,\n    \n    // CONTACTO\n    email: email,\n    ubicacion: parsedLocation.text || locationData.linkedinText,\n    pais: parsedLocation.country,\n    pais_codigo: parsedLocation.countryCode,\n    region: parsedLocation.state,\n    ciudad: parsedLocation.city,\n    \n    // EMPRESA ACTUAL\n    cargo_actual: profile.headline,\n    empresa_actual: currentCompany,\n    fecha_inicio_puesto: startDateCurrent,\n    \n    // ENGAGEMENT\n    conexiones: profile.connectionsCount,\n    seguidores: profile.followerCount,\n    verificado: profile.verified || false,\n    premium: profile.premium || false,\n    influencer: profile.influencer || false,\n    \n    // DISPONIBILIDAD\n    abierto_a_trabajo: profile.openToWork || false,\n    contratando: profile.hiring || false,\n    \n    // BIOGRAFÍA\n    biografia: profile.about,\n    \n    // LISTAS\n    experiencia_laboral: experienceList,\n    educacion: educationList,\n    skills: skillsList,\n    lenguajes: languagesList,\n    certificaciones: certificationsList,\n    proyectos: projectsList,\n    \n    // METADATA\n    top_skills: profile.topSkills,\n    memorialized: profile.memorialized || false\n  };\n  \n  // Remover campos null/undefined/vacíos\n  const result = Object.fromEntries(\n    Object.entries(extracted).filter(([_, v]) => \n      v !== null && \n      v !== undefined && \n      v !== '' && \n      (Array.isArray(v) ? v.length > 0 : true)\n    )\n  );\n  \n  return result;\n}\n\n// MAIN - Procesar perfil actual\n// $json accede al JSON del item actual\nconst profile = $json;\nconst extracted = extractProfile(profile);\n\nreturn extracted;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        2496,
        -304
      ],
      "id": "c6a5cf2c-96f1-45f8-bcf5-b814d80c6c54",
      "name": "Parser LinkedIn"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [
        2256,
        -256
      ],
      "id": "8aa270ab-9269-4cfc-a56a-eed93c148369",
      "name": "Loop Over Items"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [
        240,
        -320
      ],
      "id": "8b4bf8dc-8c47-4147-99a6-6fb315e739aa",
      "name": "Loop Over Items1"
    }
  ],
  "connections": {
    "When clicking ‘Execute workflow’": {
      "main": [
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Edit Fields": {
      "main": [
        [
          {
            "node": "ID Creation",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Message a model": {
      "main": [
        [
          {
            "node": "Parser",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Sheets Trigger": {
      "main": [
        [
          {
            "node": "Loop Over Items1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [
          {
            "node": "Enriched leads List ",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "No find out list",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "ID Creation": {
      "main": [
        [
          {
            "node": "ID added",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Enriched leads List ": {
      "main": [
        [
          {
            "node": "Run an Actor and get dataset",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "ID added": {
      "main": [
        [
          {
            "node": "Message a model",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Run an Actor and get dataset": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "LinkedIn": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parser": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parser LinkedIn": {
      "main": [
        [
          {
            "node": "LinkedIn",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Loop Over Items": {
      "main": [
        [
          {
            "node": "Loop Over Items1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Parser LinkedIn",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Loop Over Items1": {
      "main": [
        [],
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "e520ceb1784ec1cf802c40810af05fe604a6257f38e2e996de3432918f408fed"
  }
}