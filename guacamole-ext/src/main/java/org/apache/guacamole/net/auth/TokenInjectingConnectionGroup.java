/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.guacamole.net.auth;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.apache.guacamole.GuacamoleException;
import org.apache.guacamole.net.GuacamoleTunnel;
import org.apache.guacamole.protocol.GuacamoleClientInformation;

/**
 * ConnectionGroup implementation which overrides the connect() function of an
 * underlying ConnectionGroup, adding a given set of parameter tokens to the
 * tokens already supplied.
 */
public class TokenInjectingConnectionGroup extends DelegatingConnectionGroup {

    /**
     * The additional tokens to include with each call to connect().
     */
    private final Map<String, String> tokens;

    /**
     * Returns the tokens which should be added to an in-progress call to
     * connect(). If not overridden, this function will return the tokens
     * provided when this instance of TokenInjectingConnectionGroup was
     * created.
     *
     * @return
     *     The tokens which should be added to the in-progress call to
     *     connect().
     *
     * @throws GuacamoleException
     *     If the applicable tokens cannot be generated.
     */
    protected Map<String, String> getTokens() throws GuacamoleException {
        return tokens;
    }

    /**
     * Wraps the given ConnectionGroup, automatically adding the given tokens
     * to each invocation of connect(). Any additional tokens which have the
     * same name as existing tokens will override the existing values.
     *
     * @param connectionGroup
     *     The ConnectionGroup to wrap.
     *
     * @param tokens
     *     The additional tokens to include with each call to connect().
     */
    public TokenInjectingConnectionGroup(ConnectionGroup connectionGroup,
            Map<String, String> tokens) {
        super(connectionGroup);
        this.tokens = tokens;
    }

    /**
     * Wraps the given ConnectionGroup such that the additional parameter
     * tokens returned by getTokens() are included with each invocation of
     * connect(). Any additional tokens which have the same name as existing
     * tokens will override the existing values.
     *
     * @param connectionGroup
     *     The ConnectionGroup to wrap.
     */
    public TokenInjectingConnectionGroup(ConnectionGroup connectionGroup) {
        this(connectionGroup, Collections.<String, String>emptyMap());
    }

    @Override
    public GuacamoleTunnel connect(GuacamoleClientInformation info,
            Map<String, String> tokens) throws GuacamoleException {

        // Apply provided tokens over those given to connect()
        tokens = new HashMap<>(tokens);
        tokens.putAll(getTokens());

        return super.connect(info, tokens);

    }

}
