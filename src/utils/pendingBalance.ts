export const pendingBalanceClass = (balance: number, pendingInterest: number): string => {
    if (balance <= 0) {
        return 'normal-black'
    }
    const dailyInterest = (balance * 0.013) / 30
    const totalInterest = Number(pendingInterest) / dailyInterest // Dias que debe la persona
    if (totalInterest < 45) {
        return 'good-green'
    } else if (totalInterest >= 45 && totalInterest < 90) {
        return 'late-yellow'
    } else if (totalInterest >= 90 && totalInterest < 120) {
        return 'very-late-orange'
    } else if (totalInterest >= 120) {
        return 'urgent-red'
    }
    return ''
}