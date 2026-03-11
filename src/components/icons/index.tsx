import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const defaultProps: IconProps = {
  size: 16,
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
};

function createIcon(d: string | string[], viewBox = "0 0 16 16") {
  const paths = Array.isArray(d) ? d : [d];
  const Icon = ({ size = defaultProps.size, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {paths.map((path, i) => (
        <path key={i} d={path} fill="currentColor" />
      ))}
    </svg>
  );
  Icon.displayName = "Icon";
  return Icon;
}

export const UserFriendsIcon = createIcon(
  "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
);
UserFriendsIcon.displayName = "UserFriendsIcon";

export const UsersIcon = createIcon(
  "M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28A5.88 5.88 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-.94.56-2.07 1.936-3.72z"
);
UsersIcon.displayName = "UsersIcon";

export const SackIcon = createIcon(
  [
    "M5.5 2A.5.5 0 0 1 6 1.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z",
    "M3.5 6.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .447.724l-1.882 3.764A2.5 2.5 0 0 1 8.326 12H7.674a2.5 2.5 0 0 1-2.239-1.512L3.553 6.724A.5.5 0 0 1 3.5 6.5z",
  ],
  "0 0 16 14"
);
SackIcon.displayName = "SackIcon";

export const HandshakeIcon = createIcon(
  "M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0 1 1h2.038a3 3 0 0 0 .786 1.326l.01.01L7.5 13H3.5a.5.5 0 0 1 0-1h2.793L3.146 8.854a.5.5 0 1 1 .708-.708L7 11.293V5.5a.5.5 0 0 1 1 0v4.379l1.854-1.854a.5.5 0 1 1 .708.708L8.5 10.793V13h4a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.354-.146L4.293 11H2a2 2 0 0 1-2-2V7.5A5.5 5.5 0 0 1 5.5 2h2V1.866z"
);
HandshakeIcon.displayName = "HandshakeIcon";

export const PiggyBankIcon = createIcon(
  "M5 3a3 3 0 0 1 6 0v1h.5a.5.5 0 0 1 .5.5V5h.5A1.5 1.5 0 0 1 14 6.5v4A1.5 1.5 0 0 1 12.5 12H12v1.5a.5.5 0 0 1-1 0V12H5v1.5a.5.5 0 0 1-1 0V12h-.5A1.5 1.5 0 0 1 2 10.5v-4A1.5 1.5 0 0 1 3.5 5H4v-.5a.5.5 0 0 1 .5-.5H5V3z"
);
PiggyBankIcon.displayName = "PiggyBankIcon";

export const LoanRequestIcon = createIcon(
  "M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm2 3a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"
);
LoanRequestIcon.displayName = "LoanRequestIcon";

export const UserCheckIcon = createIcon(
  "M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm1.679-4.493l-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514zM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
);
UserCheckIcon.displayName = "UserCheckIcon";

export const UserTimesIcon = createIcon(
  "M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256zm4.744-1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5z"
);
UserTimesIcon.displayName = "UserTimesIcon";

export const BriefcaseIcon = createIcon(
  "M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V3H6v-.5z"
);
BriefcaseIcon.displayName = "BriefcaseIcon";

export const BankIcon = createIcon(
  "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5V5a1 1 0 0 1-1-1V2zm1 1v1h12V3H2zm2 3v6h2V6H4zm4 0v6h2V6H8zm4 0v6h1.5a.5.5 0 0 0 .5-.5V6h-2z"
);
BankIcon.displayName = "BankIcon";

export const CoinsIcon = createIcon(
  "M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.618-1.523-1.769-1.795l-.449-.103V5.571c.625.068 1.02.384 1.117.85h1.005c-.06-.923-.758-1.644-2.122-1.74V4h-.6v.688c-1.225.122-2.072.835-2.072 1.876 0 .911.574 1.458 1.643 1.71l.397.092v2.012c-.666-.078-1.08-.416-1.15-.937H5.5zm2.767-1.2c-.676-.169-1.017-.452-1.017-.95 0-.569.418-.972 1.08-1.04v1.99h-.063zm.63 1.232c.803.194 1.16.488 1.16 1.014 0 .641-.478 1.053-1.222 1.121V9.55l.062-.007z"
);
CoinsIcon.displayName = "CoinsIcon";

export const TransactionsIcon = createIcon(
  "M0 3.5A.5.5 0 0 1 .5 3H1c.646 0 .832.18 1.036.438.204.259.375.597.623.886l.012.013c.247.29.637.532 1.329.532.692 0 1.082-.242 1.329-.532l.012-.013c.248-.289.419-.627.623-.886C6.168 3.18 6.354 3 7 3h.5a.5.5 0 0 1 0 1H7c-.646 0-.832.18-1.036.438-.204.259-.375.597-.623.886l-.012.013C5.082 5.579 4.692 5.821 4 5.821c-.692 0-1.082-.242-1.329-.532l-.012-.013C2.411 4.986 2.24 4.648 2.036 4.38 1.832 4.122 1.646 3.942 1 3.942H.5A.5.5 0 0 1 0 3.5zm0 4A.5.5 0 0 1 .5 7H1c.646 0 .832.18 1.036.438.204.259.375.597.623.886l.012.013c.247.29.637.532 1.329.532.692 0 1.082-.242 1.329-.532l.012-.013c.248-.289.419-.627.623-.886C6.168 7.18 6.354 7 7 7h.5a.5.5 0 0 1 0 1H7c-.646 0-.832.18-1.036.438-.204.259-.375.597-.623.886l-.012.013C5.082 9.579 4.692 9.821 4 9.821c-.692 0-1.082-.242-1.329-.532l-.012-.013C2.411 8.986 2.24 8.648 2.036 8.38 1.832 8.122 1.646 7.942 1 7.942H.5A.5.5 0 0 1 0 7.5z"
);
TransactionsIcon.displayName = "TransactionsIcon";

export const GalaxyIcon = createIcon(
  "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-14.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0zM8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
);
GalaxyIcon.displayName = "GalaxyIcon";

export const UserCogIcon = createIcon(
  "M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256zM12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0z"
);
UserCogIcon.displayName = "UserCogIcon";

export const ScrollIcon = createIcon(
  "M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5v7.776a2.5 2.5 0 0 1-.777 1.809l-.332.305a2.5 2.5 0 0 1-3.39 0l-.332-.305A2.5 2.5 0 0 1 8.39 12H3.5a2.5 2.5 0 0 1-2.5-2.5v-5A2.5 2.5 0 0 1 3.5 2h1V.5A.5.5 0 0 1 5 0z"
);
ScrollIcon.displayName = "ScrollIcon";

export const ChartBarIcon = createIcon(
  "M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5h-2v12h2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"
);
ChartBarIcon.displayName = "ChartBarIcon";

export const SlidersIcon = createIcon(
  "M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
);
SlidersIcon.displayName = "SlidersIcon";

export const BadgePercentIcon = createIcon(
  "M9.05.435c-.58-.58-1.52-.58-2.1 0L5.613 1.77l-2.06-.41c-.82-.17-1.63.46-1.79 1.27l-.41 2.06L.02 6.025c-.58.58-.58 1.52 0 2.1l1.335 1.336-.41 2.06c-.17.82.46 1.63 1.27 1.79l2.06.41 1.336 1.335c.58.58 1.52.58 2.1 0l1.336-1.335 2.06.41c.82.17 1.63-.46 1.79-1.27l.41-2.06 1.335-1.336c.58-.58.58-1.52 0-2.1L13.98 6.025l.41-2.06c.17-.82-.46-1.63-1.27-1.79l-2.06-.41L9.724.43zM6.25 6.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm4.25 3.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM5.47 9.97a.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0z"
);
BadgePercentIcon.displayName = "BadgePercentIcon";

export const ClipboardListIcon = createIcon(
  "M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
);
ClipboardListIcon.displayName = "ClipboardListIcon";

export const TireIcon = createIcon(
  "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.399H6.41l.137-.652H8.93z"
);
TireIcon.displayName = "TireIcon";

export const DashboardIcon = createIcon(
  "M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v2A1.5 1.5 0 0 1 3.5 5h-2A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14z"
);
DashboardIcon.displayName = "DashboardIcon";

export const SearchIcon = ({ size = 16, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
      fill="currentColor"
    />
  </svg>
);
SearchIcon.displayName = "SearchIcon";

export const BellIcon = ({ size = 22, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.1538 9.30769C18.1538 7.54053 17.4515 5.84578 16.2013 4.59554C14.9511 3.34529 13.2563 2.64301 11.4892 2.64301C9.722 2.64301 8.02722 3.34529 6.77698 4.59554C5.52674 5.84578 4.82446 7.54053 4.82446 9.30769C4.82446 17.3077 1.49219 19.3077 1.49219 19.3077H21.4862C21.4862 19.3077 18.1538 17.3077 18.1538 9.30769Z"
      stroke="#213F7D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M13.4045 23.3077C13.2027 23.6585 12.9118 23.9508 12.5619 24.1543C12.2121 24.3578 11.8152 24.4651 11.4111 24.4651C11.0071 24.4651 10.6102 24.3578 10.2603 24.1543C9.91049 23.9508 9.6196 23.6585 9.41772 23.3077"
      stroke="#213F7D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
BellIcon.displayName = "BellIcon";

export const HamburgerIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
HamburgerIcon.displayName = "HamburgerIcon";

export const CloseIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
CloseIcon.displayName = "CloseIcon";

export const ChevronDownIcon = ({ size = 12, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
ChevronDownIcon.displayName = "ChevronDownIcon";

export const LogoIcon = ({ size = 25, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 25 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.92 24.72h3.84v-6.24H5.92v6.24Zm0-18.72v9.6h3.84V6H5.92Zm6.72 18.72h3.84V15.36h-3.84v9.36Zm0-18.72v6.48h3.84V6h-3.84Zm6.72 18.72h3.84V12.48h-3.84v12.24Zm0-18.72v9.6h3.84V6h-3.84Z"
      fill="#39CDCC"
    />
  </svg>
);
LogoIcon.displayName = "LogoIcon";

export const FilterIcon = ({ size = 16, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
      fill="currentColor"
    />
  </svg>
);
FilterIcon.displayName = "FilterIcon";

export const MoreIcon = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="10" cy="4" r="1.5" fill="currentColor" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    <circle cx="10" cy="16" r="1.5" fill="currentColor" />
  </svg>
);
MoreIcon.displayName = "MoreIcon";

export const LogoutIcon = createIcon(
  "M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
);
LogoutIcon.displayName = "LogoutIcon";

export const BriefcaseDropdownIcon = createIcon(
  "M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1c0 .57.32 1.066.787 1.318.131.065.268.118.41.16V12.5A1.5 1.5 0 0 0 2.696 14h10.607A1.5 1.5 0 0 0 14.804 12.5V6.978c.14-.042.278-.095.41-.16A1.5 1.5 0 0 0 16 5.5v-1A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V3H6v-.5z"
);
BriefcaseDropdownIcon.displayName = "BriefcaseDropdownIcon";

const iconMap: Record<string, React.FC<IconProps>> = {
  "user-friends": UserFriendsIcon,
  users: UsersIcon,
  sack: SackIcon,
  handshake: HandshakeIcon,
  "piggy-bank": PiggyBankIcon,
  "loan-request": LoanRequestIcon,
  "user-check": UserCheckIcon,
  "user-times": UserTimesIcon,
  briefcase: BriefcaseIcon,
  bank: BankIcon,
  coins: CoinsIcon,
  transactions: TransactionsIcon,
  galaxy: GalaxyIcon,
  "user-cog": UserCogIcon,
  scroll: ScrollIcon,
  "chart-bar": ChartBarIcon,
  sliders: SlidersIcon,
  "badge-percent": BadgePercentIcon,
  "clipboard-list": ClipboardListIcon,
  tire: TireIcon,
  dashboard: DashboardIcon,
};

export function getIcon(name: string): React.FC<IconProps> | undefined {
  return iconMap[name];
}
