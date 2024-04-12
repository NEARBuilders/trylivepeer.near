const { Button } = VM.require("video.every.near/widget/Components.button") || {
  Button: () => <></>,
};

const BrowseTabs = ({ tabs }) => {
  return (
    <div className="d-flex align-items-center gap-2 flex-wrap">
      {tabs.length &&
        tabs.map((tab) => (
          <Button key={tab.label} variant="tab">
            {tab.label}
          </Button>
        ))}
    </div>
  );
};

return { BrowseTabs };
