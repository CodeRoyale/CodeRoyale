import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";

interface ProfileTabsProps {
  panels: React.ReactNode;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ panels }) => {
  return (
    <div className="py-6">
      <Tab.Group>
        <Tab.List>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`text-primary-100 ${
                  selected
                    ? "border-b-2 border-b-button-primary-default text-button-primary-default"
                    : ""
                }`}
              >
                About
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>{panels}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};
