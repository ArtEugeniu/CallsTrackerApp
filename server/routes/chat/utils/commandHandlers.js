import { 
  createCall, 
  getAllCalls, 
  updateCall, 
  getCallById, 
  deleteCall,
  getStats
} from '../../../models/call.js';

export async function handleCreateCall(actionData) {
  try {
    const { contact_name, phone_number, call_date, duration_seconds, status, outcome, notes } = actionData.data;
    
    const newCall = await createCall({
      contact_name,
      phone_number,
      call_date,
      duration_seconds,
      status,
      outcome,
      notes
    });
    
    console.log('Call created successfully:', newCall);
    return `Apelul pentru ${contact_name} a fost înregistrat cu succes cu ID-ul ${newCall.id}.`;
  } catch (error) {
    console.error('Error creating call:', error);
    return 'Eroare la înregistrarea apelului. Vă rugăm să încercați din nou.';
  }
}

export async function handleUpdateCall(actionData) {
  try {
    const { id, ...updates } = actionData.data;
    
    if (!id) {
      return 'ID-ul apelului este necesar pentru actualizare.';
    }

    const existingCall = await getCallById(id);
    if (!existingCall) {
      return `Apelul cu ID-ul ${id} nu a fost găsit.`;
    }

    const mergedData = { ...existingCall, ...updates };
    console.log('Merging data for update:', { existing: existingCall, updates, merged: mergedData });
    
    const updatedCall = await updateCall(id, mergedData);
    console.log('Call updated successfully:', updatedCall);
    
    return `Apelul cu ID-ul ${id} a fost actualizat cu succes.`;
  } catch (error) {
    console.error('Error updating call:', error);
    return 'Eroare la actualizarea apelului. Vă rugăm să încercați din nou.';
  }
}

export async function handleDeleteCall(actionData) {
  try {
    const id = actionData.data?.id;
    
    if (!id) {
      return 'ID-ul apelului este necesar pentru ștergere.';
    }

    await deleteCall(id);
    console.log(`Call with ID ${id} deleted successfully`);
    
    return `Apelul cu ID-ul ${id} a fost șters cu succes.`;
  } catch (error) {
    console.error('Error deleting call:', error);
    return 'Eroare la ștergerea apelului. Vă rugăm să încercați din nou.';
  }
}

export async function handleGetCalls(actionData = null) {
  try {
    const calls = await getAllCalls();
    
    if (!calls || calls.length === 0) {
      return 'Nu există apeluri în baza de date.';
    }

    const callsList = [];
    callsList.push(`Lista apelurilor (${calls.length} total):`);
    
    calls.slice(0, 10).forEach((call, index) => {
      callsList.push(`${index + 1}. ${call.contact_name || 'Necunoscut'} - ${call.phone_number || 'N/A'}`);
      callsList.push(`Data: ${call.call_date || 'N/A'}, Durata: ${call.duration_seconds || 0}s`);
      callsList.push(`Status: ${call.status || 'N/A'}, Rezultat: ${call.outcome || 'N/A'}`);
      if (call.notes) {
        callsList.push(`Note: ${call.notes}`);
      }
    });

    if (calls.length > 10) {
      callsList.push(`...și încă ${calls.length - 10} apeluri.`);
    }

    return callsList.join('. ');
  } catch (error) {
    console.error('Error getting calls:', error);
    return 'Eroare la obținerea listei de apeluri.';
  }
}

export async function handleGetStats() {
  try {
    const stats = await getStats();
    console.log('Retrieved stats from database:', stats);

    if (!stats) {
      return 'Nu s-au putut obține statisticile.';
    }

    const statsList = [
      'Statistici apeluri:',
      `📊 Total apeluri: ${stats.total_calls || 0}`,
      `⏱️ Durata medie: ${stats.average_duration ? Math.round(stats.average_duration) : 0} secunde`,
      `✅ Apeluri reușite: ${stats.successful_calls || 0}`,
      `❌ Apeluri nereușite: ${stats.failed_calls || 0}`,
      `📞 Cel mai lung apel: ${stats.longest_call || 0} secunde`,
      `⚡ Cel mai scurt apel: ${stats.shortest_call || 0} secunde`
    ];

    return statsList.join('. ');
  } catch (error) {
    console.error('Error getting stats:', error);
    return 'Eroare la obținerea statisticilor.';
  }
}
