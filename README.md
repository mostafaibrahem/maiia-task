## MAIIA - Frontend Technical Test (Done)

First install the project dependencies:

```bash
yarn install
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000/appointments](http://localhost:3000) with your browser to see the implemented task

## Editor

The instructions work best with Visual Studio Code which provides an API to open local files directly from the browser by clicking a link.

If you favor another text editor providing a similar API feel free to modify `src/components/EditorLink.tsx` to suit your needs.

## Done Tasks
### Tasks for Appointment Form
          [✅] Show the list of practitioners and select one of them
          [✅] Show the list of patients and select one of them 
          [✅] Show the availabities of the selected practitioner 
          [✅] Choose the date and the time depending of the selected practitioner's availabities 
          [✅] Validate and submit the form 

### Tasks for Appointment List
           [✅] Show the list of all appointments with all mandatory informations
           [✅] Show practitioner name for each appointment
           [✅] Update dynamically the list

### Bonus tasks         
          [✅] 🤖 Cypress: implement end to end test to assess that the app works as expected
          [✅] 🔎 Search: enable search on appointment, practitioner or patient. The solution can either be front-end only or a mix of front-end and back-end 
          [✅] 🎉 Something else that we didn't think of (using marerialUI in the form and list instead of html <select> and <ul>) 
