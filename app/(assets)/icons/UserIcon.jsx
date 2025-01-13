import React from 'react'

const UserIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4177 1.52075C14.4866 1.52075 13.7402 2.26711 13.7402 3.19825C13.7402 4.09468 14.4297 4.81715 15.3025 4.87376C15.3757 4.86726 15.4506 4.86726 15.5238 4.87375C16.3951 4.8172 17.0876 4.09567 17.0952 3.1958C17.0939 2.27321 16.3463 1.52075 15.4177 1.52075ZM12.3652 3.19825C12.3652 1.50773 13.7272 0.145752 15.4177 0.145752C17.11 0.145752 18.4702 1.51863 18.4702 3.19825V3.20316H18.4702C18.4584 4.85218 17.1604 6.19106 15.5251 6.2503C15.4877 6.25166 15.4503 6.24996 15.4131 6.24522C15.376 6.24996 15.3386 6.25166 15.3012 6.2503C13.6668 6.19109 12.3652 4.85195 12.3652 3.19825Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4098 7.11356C15.8034 6.86942 17.3925 7.10218 18.5477 7.86873L18.549 7.86955C19.3386 8.39595 19.8245 9.15872 19.8245 10.0091C19.8245 10.8594 19.3386 11.6222 18.549 12.1486C17.4023 12.9161 15.8322 13.148 14.4421 12.9146C14.0677 12.8517 13.8151 12.4972 13.8779 12.1228C13.9408 11.7483 14.2953 11.4957 14.6698 11.5586C15.7908 11.7468 16.9884 11.5389 17.785 11.0054L17.7862 11.0045C18.2891 10.6693 18.4495 10.2954 18.4495 10.0091C18.4495 9.7229 18.2893 9.3492 17.7869 9.01404C16.9804 8.47922 15.7648 8.27212 14.6471 8.46793C14.2731 8.53345 13.9168 8.28337 13.8512 7.90937C13.7857 7.53537 14.0358 7.17907 14.4098 7.11356Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.50293 3.19825C1.50293 1.51863 2.86317 0.145752 4.55543 0.145752C6.24596 0.145752 7.60793 1.50773 7.60793 3.19825C7.60793 4.85195 6.3064 6.19109 4.67199 6.2503C4.63457 6.25166 4.59712 6.24996 4.56001 6.24522C4.5229 6.24996 4.48545 6.25166 4.44804 6.2503C2.81277 6.19106 1.51473 4.85218 1.50295 3.20316L1.50293 3.19825ZM2.87793 3.19581C2.88561 4.09567 3.57806 4.8172 4.44932 4.87375C4.52253 4.86726 4.5975 4.86726 4.67071 4.87376C5.54347 4.81715 6.23293 4.09468 6.23293 3.19825C6.23293 2.26711 5.48657 1.52075 4.55543 1.52075C3.62685 1.52075 2.87925 2.27321 2.87793 3.19581Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.18605 9.01403C2.99249 8.47922 4.20809 8.27212 5.32585 8.46793C5.69985 8.53345 6.05615 8.28337 6.12166 7.90937C6.18718 7.53537 5.93711 7.17907 5.56311 7.11356C4.16949 6.86942 2.58042 7.10218 1.42519 7.86873L1.42519 7.86872L1.42396 7.86955C0.634353 8.39595 0.148438 9.15872 0.148438 10.0091C0.148438 10.8592 0.634098 11.6218 1.42333 12.1482C2.57005 12.916 4.14044 13.148 5.5308 12.9146C5.90526 12.8517 6.15785 12.4972 6.09499 12.1228C6.03212 11.7483 5.67761 11.4957 5.30315 11.5586C4.1821 11.7468 2.98447 11.5389 2.18791 11.0054L2.18667 11.0045C1.68377 10.6693 1.52344 10.2954 1.52344 10.0091C1.52344 9.7229 1.68364 9.34919 2.18605 9.01403Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.91773 8.36816C8.9866 8.36816 8.24023 9.11453 8.24023 10.0457C8.24023 10.9421 8.92969 11.6646 9.80245 11.7212C9.87669 11.7146 9.95274 11.7147 10.0269 11.7214C10.8911 11.6719 11.5875 10.9479 11.5952 10.0432C11.5939 9.12062 10.8463 8.36816 9.91773 8.36816ZM6.86523 10.0457C6.86523 8.35514 8.2272 6.99316 9.91773 6.99316C11.61 6.99316 12.9702 8.36604 12.9702 10.0457V10.0506H12.9702C12.9585 11.6952 11.6637 13.0502 10.0202 13.0979C9.98439 13.0989 9.94861 13.0972 9.91315 13.0926C9.87604 13.0974 9.83859 13.0991 9.80117 13.0977C8.16676 13.0385 6.86523 11.6994 6.86523 10.0457Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0036 13.8818C11.0747 13.8818 12.1828 14.1486 13.049 14.7261C13.8386 15.2525 14.3245 16.0152 14.3245 16.8656C14.3245 17.7158 13.8387 18.4785 13.0493 19.0049C12.1794 19.5865 11.0717 19.8562 10.0002 19.8562C8.92858 19.8562 7.82088 19.5865 6.951 19.0049C6.16157 18.4785 5.67578 17.7158 5.67578 16.8656C5.67578 16.0152 6.1617 15.2525 6.9513 14.7261L6.95295 14.7249L6.95295 14.725C7.82285 14.1486 8.93227 13.8818 10.0036 13.8818ZM7.7132 15.8707C7.21094 16.2058 7.05078 16.5794 7.05078 16.8656C7.05078 17.1519 7.21112 17.5258 7.71401 17.861L7.71484 17.8616C8.31154 18.2606 9.13778 18.4812 10.0002 18.4812C10.8625 18.4812 11.6888 18.2606 12.2855 17.8616L12.2863 17.861C12.7892 17.5258 12.9495 17.1519 12.9495 16.8656C12.9495 16.5793 12.7892 16.2054 12.2863 15.8701C11.695 15.4759 10.8689 15.2568 10.0036 15.2568C9.13886 15.2568 8.30991 15.4757 7.7132 15.8707Z"
        fill={color}
      />
    </svg>
  )
}

export default UserIcon