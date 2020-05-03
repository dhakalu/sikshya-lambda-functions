const getDyanmoDBAddress = (actualAddress) => {
  const { address1, address2, state, district, postalCode } = actualAddress
  if (!address1 || !state || !district) {
    throw new Error('Must be valid address')
  }

  const address = {
    address1: {
      S: address1
    }
  }

  if (address2) {
    address.address2 = {
      S: address2
    }
  }

  if (state) {
    address.state = {
      S: state
    }
  }

  if (postalCode) {
    address.postalCode = {
      S: postalCode
    }
  }

  if (district) {
    address.district = {
      S: district
    }
  }

  return address
}

module.exports = { getDyanmoDBAddress }
