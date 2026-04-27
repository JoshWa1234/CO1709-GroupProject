import { useAuth } from "@/context/AuthContext.jsx";
import styles from "@/Features/Profile/components/PublicProfileForm/PublicProfileForm.module.css";
import useUserProfile from "@/Features/Profile/hooks/useUserProfile.js";
import InputBox from "@/ui Components/InputBox/InputBox.jsx";
import { useNavigate } from "react-router-dom";
import {useAccessibility} from "@/context/AccessibilityContext.jsx"
import Toggle from "@/ui Components/Toggle/Toggle.jsx";

export default function PublicProfileForm() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { displayName, setDisplayName, email, setEmail } = useUserProfile();
    const { darkMode, caretBrowsing, updateSetting } = useAccessibility();

    if (!user) {
        navigate('/Login');
        return null;
    }

    return (
        <div className={styles.pageStyle}>
            <div className={styles.layoutStyle}>

                {/* Left sidebar */}
                <div className={styles.sidebarStyle}>
                    <button className={styles.sidebarButtonStyle}>Settings</button>
                    <button className={styles.sidebarButtonStyle}>My Badges</button>
                    <button className={styles.sidebarButtonStyle}>Points History Log</button>
                </div>

                {/* Centre - public profile */}
                <div className={styles.panelStyle}>
                    <h2 className={styles.panelTitleStyle}>Public Profile</h2>
                    <div className={styles.avatarStyle}>👤</div>
                    <a className={styles.editPictureStyle}>Edit Profile Picture</a>

                    <div className={styles.fieldsStyle}>
                        <InputBox tag="displayName" type="text" label="Display Name" validation="none"
                                  value={displayName} onChange={setDisplayName} readOnly />
                        <InputBox tag="email" type="email" label="Email" validation="email"
                                  value={email} onChange={setEmail} readOnly />
                        <InputBox tag="password" type="password" label="Password" validation="none"
                                  value="**********" onChange={() => {}} readOnly />
                        <a className={styles.resetPasswordStyle}>Reset Password</a>
                    </div>
                </div>

                {/* Right - accessibility */}
                <div className={styles.accessibilityPanelStyle}>
                    <h2 className={styles.panelTitleStyle}>Accessibility</h2>

                    <div className={styles.toggleRowStyle}>
                        <Toggle onChange={() => updateSetting('darkMode', !darkMode)} value={darkMode}></Toggle>
                        <span>Dark Mode</span>
                    </div>

                    <div className={styles.toggleRowStyle}>
                        <Toggle
                            value={caretBrowsing}
                            onChange={(val) => {
                                updateSetting('caretBrowsing', val);
                                if (val) alert('Press F7 in your browser to enable caret browsing');
                            }}
                        />
                        <span>Caret Browsing</span>
                    </div>
                    <div className={styles.fontRowStyle}>
                        <div className={styles.fontOptionActiveStyle}>✓ Aa</div>
                        <div className={styles.fontOptionStyle}>Aa</div>
                        <div className={styles.fontOptionStyle}>Aa</div>
                    </div>
                </div>

            </div>
        </div>
    );
}