import "./AdvancedSettings.page.scss";

import React from "react";

import { TextArea, Form, Button, ButtonClickEvent } from "@fider/components";
import { Failure, actions, Fider } from "@fider/services";
import { FaStar } from "react-icons/fa";
import { AdminBasePage } from "../components/AdminBasePage";

interface AdvancedSettingsPageProps {
  customCSS: string;
}

interface AdvancedSettingsPageState {
  customCSS: string;
  error?: Failure;
}

export default class AdvancedSettingsPage extends AdminBasePage<AdvancedSettingsPageProps, AdvancedSettingsPageState> {
  public id = "p-admin-advanced";
  public name = "advanced";
  public icon = FaStar;
  public title = "Advanced";
  public subtitle = "Manage your site settings";

  constructor(props: AdvancedSettingsPageProps) {
    super(props);

    this.state = {
      customCSS: this.props.customCSS
    };
  }

  private setCustomCSS = (customCSS: string): void => {
    this.setState({ customCSS });
  };

  private handleSave = async (e: ButtonClickEvent): Promise<void> => {
    const result = await actions.updateTenantAdvancedSettings(this.state.customCSS);
    if (result.ok) {
      location.reload();
    } else {
      this.setState({ error: result.error });
    }
  };

  public content() {
    return (
      <Form error={this.state.error}>
        <h1 className="info">
          <strong>Beyop Partnership</strong>
        </h1>
        
          <p className="info">
            Beyop Partners gain exclusive perks such as beta features, advanced statistics and user data, verification badge on an instance, owner receiving a badge that'll be accessible on any Beyop instance he signs up for, and more!
          </p>
          <p className="info">
            In the text field under this message, please describe your community, activity, size, type of community, your relationship with the community (owner, admin, etc), and why you're interested in a partnership (such as expanding development potential, etc).
            You'll receive an email regarding your application status within 48 hours. Upon passing the application, you are not guarenteed partnership.
          </p>
          <p className="info">
          Requirements for partnership are the following, failure to meet these requirements will get your application auto-denied:
          </p>
          <ul className="info">
            <li>
              <strong>100 Active Registered Members</strong>: We don't publicly disclose our requirements for active and not all 100 members have to be active.
              We aim for potential partners to posses this in order to ensure they are legit.
            </li>
            <li>
              <strong>Official Instance of a Group</strong>: We require potential partners to be considered "official" with their group.
              For example, a Minecraft suggestion page that isn't managed by Mojang (minecraft developer) is ineligible for partnership.
            </li>
          </ul>
        <TextArea
          field="customCSS"
          label=""
          disabled={!Fider.session.user.isAdministrator}
          minRows={10}
          value={this.state.customCSS}
          onChange={this.setCustomCSS}
        >
        </TextArea>

        {Fider.session.user.isAdministrator && (
          <div className="field">
            <Button color="positive" onClick={this.handleSave}>
              Submit
            </Button>
          </div>
        )}
      </Form>
    );
  }
}
