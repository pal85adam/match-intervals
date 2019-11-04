const readline = require("readline");

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

dataShiftSet = [];
dataAvailabilitySet = [];

// push and sort
printAvailabilityShifts = () => {
  if (dataAvailabilitySet.length > 0) {
    dataAvailabilitySet.forEach(availability => {
      console.log(
        `${availability.typeIdentifier} ${availability.rowId}: ${availability.fromDate} ${availability.fromTime} - ${availability.toDate} ${availability.toTime} \n`
      );
      avFrom = new Date(availability.fromDate + " " + availability.fromTime);
      avTo = new Date(availability.toDate + " " + availability.toTime);

      dataShiftSet
        .filter(shift => {
          shiftFrom = new Date(shift.fromDate + " " + shift.fromTime);
          shiftTo = new Date(shift.toDate + " " + shift.toTime);
          return avFrom <= shiftFrom && avTo >= shiftTo;
        })
        .forEach(shift => {
          console.log(
            `${shift.typeIdentifier} ${shift.rowId}: ${shift.fromDate} ${shift.fromTime} - ${shift.toDate} ${shift.toTime} \n`
          );
        });
      console.log("-----------\n");
    });
  } else {
    console.log("No availabilities found!");
  }
};

// Store data into lists
pushToArray = data => {
  splitedData = data.toString().split(" ");
  objectData = {
    typeIdentifier: splitedData[0],
    rowId: splitedData[1].split(":")[0],
    fromDate: splitedData[2],
    fromTime: splitedData[3],
    toDate: splitedData[5],
    toTime: splitedData[6]
  };

  if (objectData.typeIdentifier == "Shift") {
    dataShiftSet.push(objectData);
  } else if (objectData.typeIdentifier == "Availability") {
    dataAvailabilitySet.push(objectData);
  } else {
    throw "Not valid type identifier!";
  }

  if (!RegExp(/^[a-z0-9]+$/i).test(objectData.rowId)) {
    throw "Not valid row id!";
  }
};

function main() {
  rl.on("line", data => {
    pushToArray(data);
  });

  rl.on("pause", () => {
    // console.log(dataShiftSet);
    // console.log(dataAvailabilitySet);
    printAvailabilityShifts();
  });
}

if (require.main === module) {
  main();
}
