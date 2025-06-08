import { AppState } from "@/AppState.js"

 class ActiveSessionService {
   changeValuesOnForm() { // NOT IN USE
    const session = AppState.activeSession
    // @ts-ignore
    document.getElementById('floatingSelectInput').value = session.method
    // @ts-ignore
    document.getElementById('floatingDurationInput').value = session.duration
    // @ts-ignore
    document.getElementById('floatingNoteInput').value = session.note
   }
}
 export const activeSessionService = new ActiveSessionService()