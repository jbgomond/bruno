const marshallToVm = (value, vm) => {
  if (value === undefined) {
    return vm.undefined;
  }
  if (value === null) {
    return vm.null;
  }
  if (typeof value === 'string') {
    return vm.newString(value);
  } else if (typeof value === 'number') {
    return vm.newNumber(value);
  } else if (typeof value === 'boolean') {
    return vm.newBoolean(value);
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      const arr = vm.newArray();
      for (let i = 0; i < value.length; i++) {
        vm.setProp(arr, i, marshallToVm(value[i], vm));
      }
      return arr;
    } else {
      const obj = vm.newObject();
      for (const key in value) {
        vm.setProp(obj, key, marshallToVm(value[key], vm));
      }
      return obj;
    }
  }
};

module.exports = {
  marshallToVm
};
