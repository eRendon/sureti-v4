export interface IFormPublicCard {
    investor_id?: string // Si existe en el sistema, se manda el id, si no, se manda un string vacío - esto era lo que habíamos hablado de capturarlo del cookie o localStorage
    investor_phone: string // Obligatorio
    investor_email: string // Debe ir en la petición, pero van a haber casos en los que los usuarios no lo van a ingresar - por lo tanto si no tenemos el email desde el formulario, se debe enviar uno ficticio creado por nosotros así:+57{{investor_phone}}@crm.sureti.co
    investor_persona: string // obligatorio - aún no hemos implementado A/B testing en el website así que por defecto este campo será siempre 'persona_2'
    investor_tracking?: string // Enviar vacío por ahora (string vacío)
    request_amount: string // Obligatorio - String numérico '100000.00'
    request_date: string // Obligatorio - Formato UTC - es la fecha/hora de envío del formulario
    investor_notes?: string // Enviar vacío por ahora (string vacío)
}