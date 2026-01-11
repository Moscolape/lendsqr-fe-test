const { faker } = require('@faker-js/faker');
const fs = require('fs');

function generateUser() {
    const firstName = faker.person.firstName();
    const surname = faker.person.lastName();
    const username = faker.internet.username({ firstName: firstName.toLowerCase() });
    
    return {
        id: faker.string.uuid(),
        organization: faker.company.name(),
        username: firstName,
        email: faker.internet.email({ firstName, lastName: surname }),
        phoneNumber: `0${faker.number.int({ min: 700000000, max: 909999999 })}`,
        dateJoined: faker.date.between({ from: '2022-01-01', to: new Date() }).toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        }),
        status: faker.helpers.arrayElement(['active', 'inactive', 'blacklisted', 'pending']),
        fullName: `${firstName} ${surname}`,
        bvn: faker.number.int({ min: 20000000000, max: 29999999999 }).toString(),
        gender: faker.person.sex(),
        maritalStatus: faker.helpers.arrayElement(['Single', 'Married']),
        children: faker.helpers.arrayElement(['None', '1', '2']),
        residence: faker.helpers.arrayElement(["Parent's Apartment", 'Rented', 'Owned']),
        education: {
            level: faker.helpers.arrayElement(['B.Sc', 'HND', 'M.Sc']),
            employmentStatus: faker.helpers.arrayElement(['Employed', 'Self-employed']),
            sector: faker.helpers.arrayElement(['FinTech', 'Health', 'Education']),
            duration: `${faker.number.int({ min: 1, max: 10 })} years`,
            officeEmail: faker.internet.email(),
            monthlyIncome: `₦${faker.number.int({ min: 100000, max: 500000 })}`,
            loanRepayment: `₦${faker.number.int({ min: 20000, max: 80000 })}`
        },
        socials: {
            twitter: `@${username}`,
            facebook: `${firstName} ${surname}`,
            instagram: `@${username}`
        },
        bank: {
            bankName: faker.helpers.arrayElement(['Providus Bank', 'GTBank', 'Access Bank']),
            accountNumber: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
            balance: faker.number.int({ min: 10000, max: 500000 })
        },
        guarantor: {
            fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
            phoneNumber: `0${faker.number.int({ min: 700000000, max: 909999999 })}`,
            relationship: faker.helpers.arrayElement(['Brother', 'Sister', 'Friend', 'Parent']),
            email: faker.internet.email()
        },
        tier: faker.number.int({ min: 1, max: 3 })
    };
}

const users = Array.from({ length: 500 }, generateUser);

fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
console.log('Generated users.json with 500 records!');
console.log('File size:', (fs.statSync('users.json').size / 1024).toFixed(2), 'KB');

fs.writeFileSync('users-minified.json', JSON.stringify(users));
console.log('Generated users-minified.json (minified)');