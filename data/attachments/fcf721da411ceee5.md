# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/smoke/createQuote.csr.spec.ts >> Create Quote >> Create Quote with New Customer
- Location: tests/smoke/createQuote.csr.spec.ts:25:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByText('Insurance Australia Limited', { exact: true }).first()

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e5]:
    - navigation [ref=e6]:
      - generic [ref=e7]:
        - img "Home" [ref=e9] [cursor=pointer]
        - text: 󰈙 󰀦 󰍃
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]:
            - generic [ref=e13] [cursor=pointer]: Quote
            - generic:
              - generic:
                - generic: Repairer Quote
              - generic:
                - generic: Misc Quote
              - generic:
                - generic: PDR Quote
              - generic:
                - generic: Quote Template
              - generic:
                - generic: AudaNet Tasks
              - generic:
                - generic: PNET Messages
              - generic:
                - generic: Estimage Messages
              - generic:
                - generic: ORM Messages
              - generic:
                - generic: ORM Batching
              - generic:
                - generic: Image Uploader
          - generic [ref=e14]:
            - generic [ref=e15] [cursor=pointer]: Debtor
            - generic:
              - generic:
                - generic: Quick Invoice
              - generic:
                - generic: Debtor Adjustment
              - generic:
                - generic: Receipt Entry
          - generic [ref=e16]:
            - generic [ref=e17] [cursor=pointer]: Creditor
            - generic:
              - generic:
                - generic: Sundry Creditor
              - generic:
                - generic: Payment Entry
              - generic:
                - generic: Purchase Order
              - generic:
                - generic: Return Parts
              - generic:
                - generic: Dealer Credit Entry
              - generic:
                - generic: Parts Check
          - generic [ref=e18]:
            - generic [ref=e19] [cursor=pointer]: Reports
            - generic:
              - generic:
                - generic: JCNI
              - generic:
                - generic: Due In & Due Out
              - generic:
                - generic: Capacity Calendar
              - generic:
                - generic: Job Invoiced
              - generic:
                - generic: Outstanding Parts
              - generic:
                - generic: Outstanding Credits
              - generic:
                - generic: Sales Analysis
              - generic:
                - separator
                - generic: Debtors
                - generic: Debtor List
                - generic: Receipts
                - separator
              - generic:
                - generic: Creditors
                - generic: Creditor List
                - generic: Payment List
                - separator
              - generic:
                - generic: Payroll Reports
          - generic [ref=e20]:
            - generic [ref=e21] [cursor=pointer]: Tables
            - generic:
              - generic:
                - generic: Insurer
              - generic:
                - generic: Customer
              - generic:
                - generic: Vendor
              - generic:
                - generic: Contact Profile
              - generic:
                - generic: Recurring Remarks
              - generic:
                - generic: Quick Item
              - generic:
                - generic: Item
              - generic:
                - generic: Other labour
              - generic:
                - generic: Vehicle
              - generic:
                - generic: Unscheduled Model
          - generic [ref=e22]:
            - generic [ref=e23] [cursor=pointer]: Admin
            - generic:
              - generic:
                - generic: Company Setting
              - generic:
                - generic: Users
              - generic:
                - generic: Chart of Accounts
              - generic:
                - generic: G/L Mapping
              - generic:
                - generic: Book-In
              - generic:
                - generic: Audit Trail
              - generic:
                - generic: Forgot Password Log
              - generic:
                - generic: Email/SMS Log
              - generic:
                - generic: Vehicle Lookup
        - generic [ref=e26]:
          - generic: search
          - textbox "Search the system..." [ref=e28]
        - generic [ref=e29]:
          - button "routine" [ref=e33] [cursor=pointer]:
            - generic [ref=e34]: routine
          - generic [ref=e36]:
            - generic [ref=e37]: 12:08
            - generic [ref=e38]: PM
          - button "notifications" [ref=e41] [cursor=pointer]:
            - generic [ref=e42]: notifications
          - generic [ref=e45]:
            - generic [ref=e47] [cursor=pointer]:
              - generic [ref=e48]: SKY Smash & Repair
              - generic [ref=e50]: 󰅀
            - text: 󰀄 󰈙 󱥉 󰀦 󰍃 󰙎
  - generic [ref=e51]:
    - navigation [ref=e54]:
      - article [ref=e57]:
        - text: 󰧞
        - generic [ref=e58]:
          - generic [ref=e61]: "10161"
          - combobox [ref=e66] [cursor=pointer]:
            - option
            - option "Quote To Be Written" [selected]
            - option "Pending Authority"
            - option "Follow-up Required"
            - option "Authorised"
            - option "Booked In"
            - option "Waiting For Parts"
            - option "Vehicle Arrived"
            - option "Work in Progress"
            - option "Vehicle Ready"
            - option "Invoice Pending"
            - option "Cash Settled"
            - option "Job Cancelled"
            - option "Job Declined"
            - option "Completed"
            - option "Total Loss"
          - generic [ref=e67]:
            - generic [ref=e68]:
              - generic [ref=e70]: person
              - generic [ref=e72]: directions_car
            - generic [ref=e73]:
              - generic [ref=e74]:
                - generic [ref=e75]: Total (Ex GST)
                - text: $0.00
              - generic [ref=e76]:
                - generic [ref=e77]: Total (Inc GST)
                - text: $0.00
      - generic [ref=e80]:
        - paragraph [ref=e81]:
          - generic [ref=e82] [cursor=pointer]:
            - generic [ref=e84]: save
            - generic [ref=e85]: Save
        - paragraph [ref=e86]:
          - generic [ref=e87] [cursor=pointer]:
            - generic [ref=e89]: arrow_back
            - generic [ref=e90]: Back
        - generic [ref=e93] [cursor=pointer]: more_vert
    - list [ref=e98]:
      - listitem [ref=e99]:
        - link "account_circle Header" [ref=e100] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/
          - generic [ref=e102]:
            - generic [ref=e104]: account_circle
            - generic [ref=e105]: Header
      - listitem [ref=e106]:
        - link "edit_document Quoting" [ref=e107] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/builder
          - generic [ref=e109]:
            - generic [ref=e111]: edit_document
            - generic [ref=e112]: Quoting
      - listitem [ref=e113]:
        - link "car_tag Parts" [ref=e114] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/partscontrol
          - generic [ref=e116]:
            - generic [ref=e118]: car_tag
            - generic [ref=e119]: Parts
      - listitem [ref=e120]:
        - link "imagesmode Images" [ref=e121] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/images
          - generic [ref=e123]:
            - generic [ref=e125]: imagesmode
            - generic [ref=e126]: Images
      - listitem [ref=e127]:
        - link "verified_user Assessments" [ref=e128] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/assessments
          - generic [ref=e130]:
            - generic [ref=e132]: verified_user
            - generic [ref=e133]: Assessments
      - listitem [ref=e134]:
        - link "summarize Summary" [ref=e135] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/summary
          - generic [ref=e137]:
            - generic [ref=e139]: summarize
            - generic [ref=e140]: Summary
      - listitem [ref=e141]:
        - link "receipt_long Invoice" [ref=e142] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/assessmentinvoice
          - generic [ref=e144]:
            - generic [ref=e146]: receipt_long
            - generic [ref=e147]: Invoice
      - listitem [ref=e148]:
        - link "receipt Excess" [ref=e149] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/excessinvoice
          - generic [ref=e151]:
            - generic [ref=e153]: receipt
            - generic [ref=e154]: Excess
      - listitem [ref=e155]:
        - link "docs Docs" [ref=e156] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/documents
          - generic [ref=e158]:
            - generic [ref=e160]: docs
            - generic [ref=e161]: Docs
      - listitem [ref=e162]:
        - link "mark_as_unread Comms" [ref=e163] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/communications
          - generic [ref=e165]:
            - generic [ref=e167]: mark_as_unread
            - generic [ref=e168]: Comms
      - listitem [ref=e169]:
        - link "sticky_note_2 Remarks" [ref=e170] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/remarks
          - generic [ref=e172]:
            - generic [ref=e174]: sticky_note_2
            - generic [ref=e175]: Remarks
      - listitem [ref=e176]:
        - link "percent Rates & Markups" [ref=e177] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/rates
          - generic [ref=e179]:
            - generic [ref=e181]: percent
            - generic [ref=e182]: Rates & Markups
      - listitem [ref=e183]:
        - link "edit Annotations" [ref=e184] [cursor=pointer]:
          - /url: /v2/quotes/053deebf-69de-4b74-ba76-67016f4858e0/annotations
          - generic [ref=e186]:
            - generic [ref=e188]: edit
            - generic [ref=e189]: Annotations
    - generic [ref=e193]:
      - article [ref=e195]:
        - generic [ref=e196]:
          - generic [ref=e197]:
            - generic [ref=e198]: 󰄋
            - paragraph [ref=e199]: Vehicle
          - generic [ref=e200]:
            - paragraph [ref=e201]: Key No.
            - textbox "0000" [ref=e203]
        - generic [ref=e206]:
          - generic [ref=e207]:
            - generic [ref=e208]: Registration No. *
            - textbox [ref=e212]: AUTO469622
          - generic [ref=e213]:
            - generic [ref=e214]: State
            - combobox [ref=e217] [cursor=pointer]:
              - option "Select" [disabled]
              - option "ACT"
              - option "NSW" [selected]
              - option "NT"
              - option "QLD"
              - option "SA"
              - option "TAS"
              - option "VIC"
              - option "WA"
          - button "󰍉 Rego Lookup" [ref=e219] [cursor=pointer]:
            - generic [ref=e221]: 󰍉
            - generic [ref=e222]: Rego Lookup
        - generic [ref=e224]:
          - generic [ref=e225]:
            - generic [ref=e226]: Make / Model *
            - generic [ref=e227]:
              - textbox [ref=e230]: FORD FAIRMONT ED GHIA
              - button "󰐕" [ref=e232] [cursor=pointer]:
                - generic [ref=e234]: 󰐕
          - button "󰍉 Schedules" [ref=e237] [cursor=pointer]:
            - generic [ref=e239]: 󰍉
            - generic [ref=e240]: Schedules
        - generic [ref=e241]:
          - generic [ref=e243]:
            - generic [ref=e244]: Body Style *
            - combobox [ref=e247] [cursor=pointer]:
              - option "Select" [disabled]
              - option "2 DOORS"
              - option "3 DOORS"
              - option "4 DOOR" [selected]
              - option "5 DOORS"
              - option "Bus"
              - option "Motorbike"
              - option "Others"
              - option "Truck"
              - option "UTE"
              - option "VAN"
              - option "WAGON"
          - generic [ref=e249]:
            - generic [ref=e250]: Body Style 2
            - combobox [ref=e253] [cursor=pointer]:
              - option "Select" [disabled]
              - option "4wd4Door" [selected]
              - option "Sedan4Door"
        - generic [ref=e254]:
          - generic [ref=e256]:
            - generic [ref=e257]: Paint Group *
            - generic [ref=e258]:
              - combobox [ref=e261] [cursor=pointer]:
                - option "Select" [disabled]
                - option "Metallic 1"
                - option "Metallic 2"
                - option "Metallic 3" [selected]
                - option "Solid 1"
                - option "Solid 2"
                - option "Solid 3"
              - generic [ref=e263]:
                - checkbox [ref=e264] [cursor=pointer]
                - generic [ref=e265]:
                  - generic [ref=e266]: 󰄬
                  - generic [ref=e267]: M3+
          - generic [ref=e269]:
            - generic [ref=e270]: Build Date
            - generic [ref=e271]:
              - combobox [ref=e274] [cursor=pointer]:
                - option "MM" [disabled]
                - option "01" [selected]
                - option "02"
                - option "03"
                - option "04"
                - option "05"
                - option "06"
                - option "07"
                - option "08"
                - option "09"
                - option "10"
                - option "11"
                - option "12"
              - paragraph [ref=e275]:
                - textbox "Year" [ref=e276]: "1993"
        - generic [ref=e277]:
          - generic [ref=e279]:
            - generic [ref=e280]: Transmission
            - combobox [ref=e283] [cursor=pointer]:
              - option "Select" [disabled]
              - option "Automatic" [selected]
              - option "Manual"
              - option "Tiptronics"
              - option "CVT"
              - option "DSG"
          - generic [ref=e285]:
            - generic [ref=e286]: Colour
            - paragraph [ref=e287]:
              - textbox [ref=e289]: Powder Blue
        - generic [ref=e291]:
          - generic [ref=e292]:
            - generic [ref=e293]: VIN
            - paragraph [ref=e294]:
              - textbox [ref=e295]: 35FTGHR7CCG
          - generic [ref=e296]:
            - generic [ref=e297]: Engine No.
            - textbox [ref=e299]: v8
        - generic [ref=e302]:
          - generic [ref=e303]: Odometer
          - textbox "e.g. 6" [ref=e305]: "2000"
        - generic [ref=e307]:
          - generic [ref=e308]:
            - generic [ref=e309]: Cylinders
            - textbox "e.g. 6" [ref=e311]: "6"
          - generic [ref=e312]:
            - generic [ref=e313]: Engine Size
            - textbox "e.g. 1300" [ref=e315]: "1200"
        - generic [ref=e317]:
          - generic [ref=e318]:
            - generic [ref=e319]: Trim Code
            - textbox [ref=e321]: "#eeeeee"
          - generic [ref=e322]:
            - generic [ref=e323]: Paint Code
            - textbox [ref=e325]: "#rtevhccc"
      - article [ref=e327]:
        - generic [ref=e328]:
          - generic [ref=e329]:
            - text: 󰧞
            - generic [ref=e330]: 󰀓
            - paragraph [ref=e331]: Customer
          - generic [ref=e333]:
            - generic [ref=e334]:
              - radio [ref=e335] [cursor=pointer]
              - generic [ref=e337]: Company
            - generic [ref=e338]:
              - radio [checked] [ref=e339] [cursor=pointer]
              - generic [ref=e341]: Person
        - generic [ref=e344]:
          - generic [ref=e345]:
            - generic [ref=e346]: First Name *
            - textbox "First Name" [ref=e349]: Automation43595229
          - generic [ref=e350]:
            - generic [ref=e351]: Last Name *
            - textbox "Last Name" [ref=e354]: Test43595229
        - generic [ref=e355]:
          - generic [ref=e357]:
            - generic [ref=e358]: Emails
            - button "add" [ref=e360] [cursor=pointer]:
              - generic [ref=e361]: add
          - generic [ref=e363]:
            - generic [ref=e364]: Phones
            - button "add" [ref=e366] [cursor=pointer]:
              - generic [ref=e367]: add
          - generic [ref=e369]:
            - generic [ref=e370]: Alternative Customer Contact
            - button "add" [ref=e371] [cursor=pointer]:
              - generic [ref=e372]: add
          - generic [ref=e373]:
            - generic [ref=e374]:
              - generic [ref=e375]: Address
              - generic [ref=e376]:
                - combobox [ref=e379] [cursor=pointer]:
                  - option "H" [selected]
                  - option "W"
                  - option "M"
                - generic [ref=e381]:
                  - textbox "Start typing address" [ref=e382]: Test Ridge Trail
                  - text: 󰍎
            - generic [ref=e383]:
              - generic [ref=e384]: Suburb
              - textbox "Suburb" [ref=e386]: Banda Banda
            - generic [ref=e387]:
              - generic [ref=e388]: State
              - textbox "State" [ref=e390]: NSW
            - generic [ref=e392]:
              - generic [ref=e394]:
                - generic [ref=e395]: Postal code
                - textbox "Postal code" [ref=e396]: "2446"
              - generic [ref=e398]:
                - generic [ref=e399]: Country
                - textbox "Country" [ref=e400]: Australia
      - article [ref=e402]:
        - generic [ref=e404]:
          - generic [ref=e405]: 󰒙
          - paragraph [ref=e406]: Insurer/Debtor
        - generic [ref=e408]:
          - generic [ref=e409]: Insurer *
          - combobox [ref=e411]:
            - textbox "Search By Name..." [active] [ref=e414]
            - listbox [ref=e416]:
              - option "A & G Insurance Services" [ref=e417]:
                - generic [ref=e418] [cursor=pointer]: A & G Insurance Services
              - option "A.A.M.I" [ref=e419]:
                - generic [ref=e420] [cursor=pointer]: A.A.M.I
              - option "AAI" [ref=e421]:
                - generic [ref=e422] [cursor=pointer]: AAI
              - option "AAM Insurance" [ref=e423]:
                - generic [ref=e424] [cursor=pointer]: AAM Insurance
              - option "Automation 28930" [ref=e425]:
                - generic [ref=e426] [cursor=pointer]: Automation 28930
              - option "Automation 30131" [ref=e427]:
                - generic [ref=e428] [cursor=pointer]: Automation 30131
              - option "Automation 35979" [ref=e429]:
                - generic [ref=e430] [cursor=pointer]: Automation 35979
              - option "Automation 40692" [ref=e431]:
                - generic [ref=e432] [cursor=pointer]: Automation 40692
              - option "Automation 55500" [ref=e433]:
                - generic [ref=e434] [cursor=pointer]: Automation 55500
              - option "Automation 67729" [ref=e435]:
                - generic [ref=e436] [cursor=pointer]: Automation 67729
              - option "Automation 83423" [ref=e437]:
                - generic [ref=e438] [cursor=pointer]: Automation 83423
              - option "Automation 97916" [ref=e439]:
                - generic [ref=e440] [cursor=pointer]: Automation 97916
              - option "Automation Insurer 07565" [ref=e441]:
                - generic [ref=e442] [cursor=pointer]: Automation Insurer 07565
              - option "Automation Insurer 08675" [ref=e443]:
                - generic [ref=e444] [cursor=pointer]: Automation Insurer 08675
              - option "Automation Insurer 10729" [ref=e445]:
                - generic [ref=e446] [cursor=pointer]: Automation Insurer 10729
              - option "Automation Insurer 11371" [ref=e447]:
                - generic [ref=e448] [cursor=pointer]: Automation Insurer 11371
              - option "Automation Insurer 12521" [ref=e449]:
                - generic [ref=e450] [cursor=pointer]: Automation Insurer 12521
              - option "Automation Insurer 16479" [ref=e451]:
                - generic [ref=e452] [cursor=pointer]: Automation Insurer 16479
              - option "Automation Insurer 17195" [ref=e453]:
                - generic [ref=e454] [cursor=pointer]: Automation Insurer 17195
              - option "Automation Insurer 17454" [ref=e455]:
                - generic [ref=e456] [cursor=pointer]: Automation Insurer 17454
              - option "Automation Insurer 18467" [ref=e457]:
                - generic [ref=e458] [cursor=pointer]: Automation Insurer 18467
              - option "Automation Insurer 20553 Edit" [ref=e459]:
                - generic [ref=e460] [cursor=pointer]: Automation Insurer 20553 Edit
              - option "Automation Insurer 22045" [ref=e461]:
                - generic [ref=e462] [cursor=pointer]: Automation Insurer 22045
              - option "Automation Insurer 23475" [ref=e463]:
                - generic [ref=e464] [cursor=pointer]: Automation Insurer 23475
              - option "Automation Insurer 23994" [ref=e465]:
                - generic [ref=e466] [cursor=pointer]: Automation Insurer 23994
              - option "Automation Insurer 25070" [ref=e467]:
                - generic [ref=e468] [cursor=pointer]: Automation Insurer 25070
              - option "Automation Insurer 28705" [ref=e469]:
                - generic [ref=e470] [cursor=pointer]: Automation Insurer 28705
              - option "Automation Insurer 29486" [ref=e471]:
                - generic [ref=e472] [cursor=pointer]: Automation Insurer 29486
              - option "Automation Insurer 30615" [ref=e473]:
                - generic [ref=e474] [cursor=pointer]: Automation Insurer 30615
              - option "Automation Insurer 31911" [ref=e475]:
                - generic [ref=e476] [cursor=pointer]: Automation Insurer 31911
              - option "Automation Insurer 32722 Edit" [ref=e477]:
                - generic [ref=e478] [cursor=pointer]: Automation Insurer 32722 Edit
              - option "Automation Insurer 32866" [ref=e479]:
                - generic [ref=e480] [cursor=pointer]: Automation Insurer 32866
              - option "Automation Insurer 33779" [ref=e481]:
                - generic [ref=e482] [cursor=pointer]: Automation Insurer 33779
              - option "Automation Insurer 34763" [ref=e483]:
                - generic [ref=e484] [cursor=pointer]: Automation Insurer 34763
              - option "Automation Insurer 34915" [ref=e485]:
                - generic [ref=e486] [cursor=pointer]: Automation Insurer 34915
              - option "Automation Insurer 35647" [ref=e487]:
                - generic [ref=e488] [cursor=pointer]: Automation Insurer 35647
              - option "Automation Insurer 37943" [ref=e489]:
                - generic [ref=e490] [cursor=pointer]: Automation Insurer 37943
              - option "Automation Insurer 38966" [ref=e491]:
                - generic [ref=e492] [cursor=pointer]: Automation Insurer 38966
              - option "Automation Insurer 40319" [ref=e493]:
                - generic [ref=e494] [cursor=pointer]: Automation Insurer 40319
              - option "Automation Insurer 40341" [ref=e495]:
                - generic [ref=e496] [cursor=pointer]: Automation Insurer 40341
              - option "Automation Insurer 41745" [ref=e497]:
                - generic [ref=e498] [cursor=pointer]: Automation Insurer 41745
              - option "Automation Insurer 43351" [ref=e499]:
                - generic [ref=e500] [cursor=pointer]: Automation Insurer 43351
              - option "Automation Insurer 43411" [ref=e501]:
                - generic [ref=e502] [cursor=pointer]: Automation Insurer 43411
              - option "Automation Insurer 45575 Edit" [ref=e503]:
                - generic [ref=e504] [cursor=pointer]: Automation Insurer 45575 Edit
              - option "Automation Insurer 45756" [ref=e505]:
                - generic [ref=e506] [cursor=pointer]: Automation Insurer 45756
              - option "Automation Insurer 48264" [ref=e507]:
                - generic [ref=e508] [cursor=pointer]: Automation Insurer 48264
              - option "Automation Insurer 48739" [ref=e509]:
                - generic [ref=e510] [cursor=pointer]: Automation Insurer 48739
              - option "Automation Insurer 49666" [ref=e511]:
                - generic [ref=e512] [cursor=pointer]: Automation Insurer 49666
              - option "Automation Insurer 51750" [ref=e513]:
                - generic [ref=e514] [cursor=pointer]: Automation Insurer 51750
              - option "Automation Insurer 52015" [ref=e515]:
                - generic [ref=e516] [cursor=pointer]: Automation Insurer 52015
        - generic [ref=e517]:
          - generic [ref=e518]: ABN
          - textbox "ABN" [disabled] [ref=e520]
        - generic [ref=e522]:
          - generic [ref=e523]:
            - generic [ref=e524]: Claim Number
            - textbox "Claim Number" [ref=e526]: CL-996572
          - generic [ref=e527]:
            - generic [ref=e528]: Policy Number
            - textbox "Policy No." [ref=e530]
        - generic [ref=e532]:
          - generic [ref=e533]:
            - generic [ref=e534]: Labour Times
            - combobox [ref=e537] [cursor=pointer]:
              - option "NRMA"
              - option "FQT" [selected]
              - option "NTAR"
              - option "LTAR"
              - option "VERO-NZ"
              - option "eMTA"
              - option "WESF"
              - option "RACQ"
          - generic [ref=e538]:
            - generic [ref=e539]: Method
            - generic [ref=e541]:
              - button "󰅐 Hours" [ref=e542] [cursor=pointer]:
                - generic [ref=e544]: 󰅐
                - generic [ref=e545]: Hours
              - button "󰄖 Dollars" [ref=e546] [cursor=pointer]:
                - generic [ref=e548]: 󰄖
                - generic [ref=e549]: Dollars
        - generic [ref=e551]:
          - generic [ref=e552]:
            - generic [ref=e553]:
              - generic [ref=e554]: Excess
              - generic [ref=e555]:
                - generic [ref=e556] [cursor=pointer]: Includes GST
                - generic [ref=e557]:
                  - checkbox [ref=e558] [cursor=pointer]
                  - generic [ref=e560]: 󰄬
            - textbox "Excess" [ref=e562]: "0.00"
          - generic [ref=e563]:
            - generic [ref=e564]: Owners Contribution
            - textbox "Owner's Contribution" [ref=e566]: "0.00"
        - generic [ref=e569]:
          - generic [ref=e570]: Discount On Invoice
          - textbox "Discount applied on invoice" [ref=e572]: $ 0.00
        - generic [ref=e573]:
          - generic [ref=e575]:
            - generic [ref=e576]: Assessor
            - textbox "Assessor" [ref=e579]
          - generic [ref=e581]:
            - generic [ref=e582]: Phone Number
            - textbox "xxxxxxxxx" [ref=e584]
        - generic [ref=e585]:
          - generic [ref=e586]: Estimator
          - textbox "Quoter" [ref=e589]: Jayanth
        - generic [ref=e592]:
          - generic [ref=e593]: Is Towed
          - generic [ref=e595]:
            - checkbox [ref=e596] [cursor=pointer]
            - generic [ref=e598]: "No"
      - article [ref=e600]:
        - generic [ref=e602]:
          - generic [ref=e603]: calendar_clock
          - paragraph [ref=e604]: Key Dates
        - generic [ref=e606]:
          - generic [ref=e607]: Request for Quote Date
          - generic [ref=e611]:
            - textbox "Quote Date" [ref=e612]: 08/06/2026
            - generic:
              - generic: 󰃭
        - generic [ref=e614]:
          - generic [ref=e616]:
            - generic [ref=e617]: Inspection Booking
            - generic [ref=e620]:
              - textbox "Inspection Start Date" [ref=e621]
              - generic:
                - generic: 󰃭
          - generic [ref=e622]:
            - generic [ref=e623]: Booking Attended
            - generic [ref=e624]: "No"
        - generic [ref=e626]:
          - generic [ref=e627]:
            - generic [ref=e628]: Sent for Authority
            - generic [ref=e632]:
              - textbox "Sent for Assessment" [ref=e633]
              - generic:
                - generic: 󰃭
          - generic [ref=e634]:
            - generic [ref=e635]: Authority Date
            - generic [ref=e639]:
              - textbox "Authority Date" [ref=e640]
              - generic:
                - generic: 󰃭
        - generic [ref=e642]:
          - generic [ref=e644]:
            - generic: Repair Booked Date
            - generic [ref=e646]:
              - generic [ref=e647]:
                - textbox "Repair Booked Date" [disabled] [ref=e648]
                - generic:
                  - generic: 󰃭
              - generic [ref=e652]: 󰅖
          - generic [ref=e653]:
            - generic [ref=e654]: Is Repair Booked
            - generic [ref=e655]:
              - generic [ref=e656]:
                - radio [ref=e657] [cursor=pointer]
                - generic [ref=e659]: "Yes"
              - generic [ref=e660]:
                - radio [ref=e661] [cursor=pointer]
                - generic [ref=e663]: "No"
        - generic [ref=e665]:
          - generic [ref=e667]:
            - generic [ref=e668]: Estimated Start Date
            - generic [ref=e671]:
              - textbox "Job Start Date" [ref=e672]
              - generic:
                - generic: 󰃭
          - generic [ref=e674]:
            - generic [ref=e675]: Estimated End Date
            - generic [ref=e677]:
              - generic [ref=e678]:
                - textbox "Job End Date" [ref=e679]
                - generic:
                  - generic: 󰃭
              - generic [ref=e683] [cursor=pointer]: 󰅖
        - generic [ref=e685]:
          - generic [ref=e686]:
            - generic [ref=e687]: Vehicle Arrived
            - generic [ref=e689]:
              - generic [ref=e690]:
                - textbox "Arrive for Repair Date" [ref=e691]
                - generic:
                  - generic: 󰃭
              - generic [ref=e695] [cursor=pointer]: 󰅖
          - generic [ref=e696]:
            - generic [ref=e697]: Vehicle On Site
            - generic [ref=e699]:
              - checkbox [ref=e700] [cursor=pointer]
              - generic [ref=e702]: "No"
        - generic [ref=e704]:
          - generic [ref=e705]:
            - generic [ref=e706]: Job Start Date
            - generic [ref=e709]:
              - textbox "Job Start" [ref=e710]
              - generic:
                - generic: 󰃭
          - generic [ref=e711]:
            - generic [ref=e712]: Job Completed Date
            - generic [ref=e714]:
              - generic [ref=e715]:
                - textbox "Job Completion" [ref=e716]
                - generic:
                  - generic: 󰃭
              - generic [ref=e720] [cursor=pointer]: 󰅖
        - generic [ref=e722]:
          - generic [ref=e723]:
            - generic [ref=e724]: Vehicle Picked Up
            - generic [ref=e726]:
              - generic [ref=e727]:
                - textbox "Vehicle Departed Date" [ref=e728]
                - generic:
                  - generic: 󰃭
              - generic [ref=e732] [cursor=pointer]: 󰅖
          - generic [ref=e733]:
            - generic [ref=e734]: Vehicle Departed
            - generic [ref=e736]:
              - checkbox [ref=e737] [cursor=pointer]
              - generic [ref=e739]: "No"
```

# Test source

```ts
  209 |     cyl?: string;
  210 |     cc?: string;
  211 |   }) {
  212 |     await step("Fill Vehicle Specs", async () => {
  213 |       if (data.model) await this.dropdown1.selectOption(data.model);
  214 |       if (data.transmission)
  215 |         await this.dropdown2.selectOption(data.transmission);
  216 |       if (data.color) await this.colorInput.fill(data.color);
  217 |       if (data.vin) await this.vinInput.fill(data.vin);
  218 |       if (data.engine) await this.engineInput.fill(data.engine);
  219 |       if (data.year) await this.yearInput.fill(data.year);
  220 |       if (data.cyl) await this.cylInput.fill(data.cyl);
  221 |       if (data.cc) await this.ccInput.fill(data.cc);
  222 |     });
  223 |   }
  224 | 
  225 |   async fillPaintDetails(data: { paint1?: string; paint2?: string }) {
  226 |     await step("Fill Paint Details", async () => {
  227 |       if (data.paint1) await this.paint1.fill(data.paint1);
  228 |       if (data.paint2) await this.paint2.fill(data.paint2);
  229 |     });
  230 |   }
  231 | 
  232 |   async fillCustomerDetails(data: { firstName?: string; lastName?: string }) {
  233 |     await step("Fill Customer Details", async () => {
  234 |       if (data.firstName) await this.firstName.fill(data.firstName);
  235 |       if (data.lastName) await this.lastName.fill(data.lastName);
  236 |     });
  237 |   }
  238 | 
  239 |   async createUniqueCustomer() {
  240 |     let customerData!: ReturnType<typeof generateRandomCustomer>;
  241 |     await step("Create New Customer", async () => {
  242 |       customerData = generateRandomCustomer();
  243 |       await this.firstName.fill(customerData.firstName);
  244 |       await this.lastName.fill(customerData.lastName);
  245 |     });
  246 |     return customerData;
  247 |   }
  248 | 
  249 |   async selectExistingCustomer(firstName: string) {
  250 |     await step(`Select Existing Customer "${firstName}"`, async () => {
  251 |       await this.firstName.fill(firstName);
  252 |       await this.page
  253 |         .getByRole("button", { name: new RegExp(firstName, "i") })
  254 |         .click();
  255 |       await expect(this.firstName).toHaveValue(/.+/);
  256 |       await expect(this.lastName).toHaveValue(/.+/);
  257 |     });
  258 |   }
  259 | 
  260 |   async addAlternativeContact(data: { firstName?: string; lastName?: string }) {
  261 |     await step("Add Alternative Contact", async () => {
  262 |       await this.addAltContact.click();
  263 |       if (data.firstName) await this.altFirstName.fill(data.firstName);
  264 |       if (data.lastName) await this.altLastName.fill(data.lastName);
  265 |     });
  266 |   }
  267 | 
  268 |   async fillAddress(data: { address?: string; selectAddress?: boolean }) {
  269 |     await step("Fill Address", async () => {
  270 |       if (data.address) await this.addressInput.fill(data.address);
  271 |       if (data.selectAddress) await this.addressSelect.click();
  272 |     });
  273 |   }
  274 | 
  275 |   async fillClaimNumber(): Promise<string> {
  276 |     let claimNumber!: string;
  277 |     await step("Fill Claim Number", async () => {
  278 |       claimNumber = `CL-${Math.floor(100000 + Math.random() * 900000)}`;
  279 |       await this.claimNumberInput.fill(claimNumber);
  280 |     });
  281 |     return claimNumber;
  282 |   }
  283 | 
  284 |   async selectInsurer(primary: string) {
  285 |     await step(`Select Insurer "${primary}"`, async () => {
  286 |       await this.insurerDropdown.click();
  287 |       if (primary) {
  288 |         await Promise.all([
  289 |           this.page.waitForResponse(
  290 |             (r) =>
  291 |               r.url().includes("/UniqApi/v1/insurers/") &&
  292 |               r.request().method() === "GET" &&
  293 |               r.status() === 200,
  294 |           ),
  295 |           this.page.getByText(primary, { exact: true }).click(),
  296 |         ]);
  297 |       }
  298 |     });
  299 |   }
  300 | 
  301 |   async expectInsurerSelected(name: string) {
  302 |     await expect(this.selectedInsurer).toHaveText(name);
  303 |   }
  304 | 
  305 |   async updateInsurer(secondary: string) {
  306 |     await step(`Update Insurer to "${secondary}"`, async () => {
  307 |       await this.insurerDropdown.click();
  308 |       if (secondary)
> 309 |         await this.page.getByText(secondary, { exact: true }).first().click();
      |                                                                       ^ Error: locator.click: Test timeout of 60000ms exceeded.
  310 |     });
  311 |   }
  312 | 
  313 |   async getAllToastMessages() {
  314 |     const toasts = this.page.getByRole("alert");
  315 |     await toasts.first().waitFor({ state: "visible", timeout: 10000 });
  316 |     const count = await toasts.count();
  317 |     const messages: (string | null)[] = [];
  318 |     for (let i = 0; i < count; i++) {
  319 |       messages.push(await toasts.nth(i).textContent());
  320 |     }
  321 |     return messages;
  322 |   }
  323 | 
  324 |   async goBack() {
  325 |     await this.backBtn.click();
  326 |   }
  327 | }
  328 | 
```