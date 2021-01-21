const transformData = (data) => {
  return {
    id: Math.random(),
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    name: data.supplier.name,
    website: data.supplier.website,
    internalComments: data.supplier.comment,
    deliveryTime: data.supplier.deliveryTime,
    minimumOrder: 600,
    contacts: data.contactPersons.map((person) => ({
      id: Math.random(),
      salutation: person.gender,
      firstName: person.firstName,
      lastName: person.lastName,
      position: person.position,
      spokenLanguage: person.language,
      phone: person.telephone,
      email: person.email,
    })),
  };
};

export default transformData;
