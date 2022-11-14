import * as React from "react";
import { AppShell, Footer, Loader, Navbar, ScrollArea } from "@mantine/core";
import MyHeader from "../components/MyHeader";
import SubaccountPreviewButton, {
  SubaccountPreview,
} from "../components/SubaccountPreviewButton";
import { useQuery } from "@tanstack/react-query";
import SubaccountView from "../components/SubaccountView";
import { TbPlus } from "react-icons/tb";
import { BASE_URL } from "../api/constants";
import Cookies from "js-cookie";

// Create 10 fake accounts with email "user@example.com"
const fakeSubaccounts: SubaccountPreview[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i,
    name: `Subaccount ${i}`,
    username: "user@example.com",
  })
);

function HomePage() {
  const [mode, setMode] = React.useState<"view" | "add">("view");
  const [selectedSubaccountId, setSelectedSubaccountId] =
    React.useState<number>();

  const [searchValue, setSearchValue] = React.useState("");

  const {
    data: subaccounts,
    isLoading,
    isFetching,
    error,
  } = useQuery<SubaccountPreview[]>(["subaccounts"], () =>
    fetch(`${BASE_URL}/accounts/subaccounts`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json() || fakeSubaccounts;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error("error when fetching subaccounts", error);
      })
  );

  const handleSelect = (id: number) => {
    setMode("view");
    setSelectedSubaccountId(id);
  };

  function showAddSubaccount() {
    setSelectedSubaccountId(undefined);
    setMode("add");
  }

  function createdSubaccountCallback() {
    setSelectedSubaccountId(undefined);
    setMode("view");
  }

  const filteredSubaccounts = React.useMemo(() => {
    if (!subaccounts) {
      return [];
    }

    if (searchValue === "") {
      return subaccounts;
    }

    return subaccounts.filter((subaccount) =>
      subaccount.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [subaccounts, searchValue]);

  React.useEffect(() => {
    setSelectedSubaccountId(undefined);
  }, [filteredSubaccounts]);

  return (
    <AppShell
      className="min-h-screen bg-slate-800 text-slate-100"
      header={
        <MyHeader
          searchValue={searchValue}
          setSearchValue={(s) => setSearchValue(s)}
        />
      }
      navbar={
        <Navbar width={{ base: 384 }} className="border-none bg-slate-700">
          <Navbar.Section
            grow
            component={ScrollArea}
            type="scroll"
            mx="-xs"
            px="xs"
            classNames={{
              scrollbar: "bg-slate-700 hover:bg-slate-700",
              thumb: "bg-slate-500 hover:bg-slate-500",
            }}
          >
            <div className="flex flex-col pt-4">
              {(isFetching || isLoading) && !subaccounts ? (
                <div className="self-center">
                  <Loader />
                </div>
              ) : (
                filteredSubaccounts.map((subaccount) => (
                  <SubaccountPreviewButton
                    selected={selectedSubaccountId === subaccount.id}
                    onSelect={() => handleSelect(subaccount.id)}
                    subaccountPreview={subaccount}
                  />
                ))
              )}
            </div>
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer
          height={48}
          className="px-8 h-full bg-slate-700 text-inherit border-t-slate-900 border-t-2 flex flex-row items-center"
        >
          <button
            onClick={() => showAddSubaccount()}
            className="bg-slate-800 w-64 py-2 rounded-sm flex flex-row justify-center items-center hover:bg-slate-900 text-blue-300 "
          >
            <TbPlus size={24} />
          </button>
        </Footer>
      }
    >
      <SubaccountView
        mode={mode}
        subaccountId={selectedSubaccountId}
        onCreateCallback={createdSubaccountCallback}
      />
    </AppShell>
  );
}

export default HomePage;
// Create 10 subaccounts
