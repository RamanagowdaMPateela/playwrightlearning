export class TestData {
    static makeAppointmentTestData() {
        return [
            {
                testId: "TC001",
                facility: "Tokyo CURA Healthcare Center",
                hcp: "Medicare",
                visitDt: "05/12/2025"
            },
            {
                testId: "TC002",
                facility: "Hongkong CURA Healthcare Center",
                hcp: "Medicaid",
                visitDt: "06/12/2025"
            },
            {
                testId: "TC003",
                facility: "Seoul CURA Healthcare Center",
                hcp: "None",
                visitDt: "07/12/2025"
            }
        ]
    }
}