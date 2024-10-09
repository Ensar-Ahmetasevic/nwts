"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

import dayjs from "dayjs";

export default function ConditionsDetails({ toggelModal, haleConditions }) {
  const emplyeeData = haleConditions.preStorageResponsibleEmployee;

  const employee = {
    fullName: emplyeeData.name + " " + emplyeeData.surname,
    addresse: emplyeeData.address,
    lastDate: dayjs(haleConditions.createdAt).format("DD/MM/YYYY"),
    lastTime: dayjs(haleConditions.createdAt).format("HH:mm:ss"),
  };

  const conditionsData = {
    temperature: haleConditions.preStorageTemperature,
    radiation: haleConditions.preStorageRadiationLevel,
    humidity: haleConditions.preStorageHumidity,
    pressure: haleConditions.preStoragePressure,
  };

  const optimalPreStorageConditions = (
    <div>
      <p>
        <b> Temperature:&ensp;</b> -5°C - 35°C
      </p>
      <p>
        <b> Radiation:&ensp;</b>0 - 0.1 μSv/h
      </p>
      <p>
        <b> Humidity:&ensp;</b> 40% - 60%
      </p>
      <p>
        <b> Pressure:&ensp;</b> 1010 hPa - 1020 hPa
      </p>
    </div>
  );

  const WarningPreStorageConditions = (
    <div>
      <p>
        <b> Temperature:&ensp;</b> below -5°C to -25°C - above 35°C to 40°C
      </p>
      <p>
        <b> Radiation:&ensp;</b> 0.1 μSv/h - 0.5 μSv/h
      </p>
      <p>
        <b> Humidity:&ensp;</b> below 40% to 30% - above 60% to 70%
      </p>
      <p>
        <b> Pressure:&ensp;</b> below 1010 to 1000 hPa - above 1020 - 1030 hPa
      </p>
    </div>
  );

  const DangerPreStorageConditions = (
    <div>
      <p>
        <b> Temperature:&ensp;</b> below -25°C - above 40°C
      </p>
      <p>
        <b> Radiation:&ensp;</b> above 0.5 μSv/h
      </p>
      <p>
        <b> Humidity:&ensp;</b> below 30% - above 70%
      </p>
      <p>
        <b> Pressure:&ensp;</b> below 1000 hPa - above 1030 hPa
      </p>
    </div>
  );

  return (
    <>
      <div className="prose flex flex-col items-center space-y-4">
        {/* Legenda */}
        <div className="mb-10 flex flex-row space-x-6">
          {/* Optimal */}
          <div className="flex flex-col items-center">
            <p className="mb-2">Optimal</p>
            <div
              className="h-6 w-6 cursor-pointer rounded border-2 border-green-600 bg-green-600 hover:scale-110"
              data-tooltip-id="optimalTooltip"
              data-tooltip-place="bottom"
            ></div>
            <ReactTooltip id="optimalTooltip">
              {optimalPreStorageConditions}
            </ReactTooltip>
          </div>
          {/* Warning */}
          <div className="flex flex-col items-center">
            <p className="mb-2">Warning</p>

            <div
              className="h-6 w-6 cursor-pointer rounded border-2 border-orange-600 bg-orange-600 hover:scale-110"
              data-tooltip-id="warningTooltip"
              data-tooltip-place="bottom"
            ></div>
            <ReactTooltip id="warningTooltip">
              {WarningPreStorageConditions}
            </ReactTooltip>
          </div>
          {/* Danger */}
          <div className="flex flex-col items-center">
            <p className="mb-2">Danger</p>

            <div
              className="h-6 w-6 cursor-pointer rounded border-2 border-red-600 bg-red-600 hover:scale-110"
              data-tooltip-id="dangerTooltip"
              data-tooltip-place="bottom"
            ></div>
            <ReactTooltip id="dangerTooltip">
              {DangerPreStorageConditions}
            </ReactTooltip>
          </div>
        </div>

        {/* Parametars */}

        <div className="stats stats-vertical shadow lg:stats-horizontal">
          <div className="stat flex flex-col items-center">
            <div className="stat-title">Temperature</div>
            <div className="stat-value">
              {`${conditionsData.temperature} °C`}
            </div>
            <div className="stat-desc mt-3">
              <div className="h-4 w-4 rounded border-2 border-green-600 bg-green-600 hover:scale-110"></div>
            </div>
          </div>

          <div className="stat flex flex-col items-center border border-green-600">
            <div className="stat-title">Radiation</div>
            <div className="stat-value">{`${conditionsData.radiation} μSv/h`}</div>
            <div className="stat-desc mt-3">
              {" "}
              <div className="h-4 w-4 rounded border-2 border-green-600 bg-green-600 hover:scale-110"></div>
            </div>
          </div>

          <div className="stat flex flex-col items-center border border-green-600">
            <div className="stat-title">Humidity</div>
            <div className="stat-value">{`${conditionsData.humidity} %`}</div>
            <div className="stat-desc mt-3">
              {" "}
              <div className="h-4 w-4 rounded border-2 border-green-600 bg-green-600 hover:scale-110"></div>
            </div>
          </div>

          <div className="stat flex flex-col items-center border border-green-600">
            <div className="stat-title">Pressure</div>
            <div className="stat-value">{`${conditionsData.pressure} hPa`}</div>
            <div className="stat-desc mt-3">
              {" "}
              <div className="h-4 w-4 rounded border-2 border-green-600 bg-green-600 hover:scale-110"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Update */}

      <div className="mt-16 flex flex-col space-y-8">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-lg">Last update by:</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th></th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-14 w-14">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{employee.fullName}</div>
                      <div className="text-sm opacity-50">
                        {employee.addresse}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{employee.lastDate}</div>
                    <div className="text-sm opacity-50">
                      {employee.lastTime}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Time and Date</th>

                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Button open modal */}
        <button
          className="btn btn-outline btn-info mb-5 w-full transition delay-75 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
          onClick={() => toggelModal()}
        >
          Update Conditions
        </button>
      </div>
    </>
  );
}
